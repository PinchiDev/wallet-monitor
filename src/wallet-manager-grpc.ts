import {SingleWalletManager, WalletExecuteOptions, WithWalletExecutor} from "./single-wallet-manager";
import {ChainName, isChain} from "./wallets";
import * as grpc from '@grpc/grpc-js';
import {getDefaultNetwork, WalletManagerConfig, WalletManagerOptions} from "./wallet-manager";
import winston from "winston";
import {createLogger} from "./utils";
import * as util from "util";
const { WalletManagerClient, AcquireLockRequest, ReleaseLockRequest } = require('wallet-manager-grpc');

export class WalletManagerGrpc {
    /**
     * Class that is similar but not equivalent to a WalletManager.
     * In this case where WalletManager is spawned within a separate service, we don't need to read
     *  from events, expose balances, expose errors.
     * This class basically just provides a way to get a locked wallet for a specific chain.
     */
    private grpcClientStub: any;
    private managers;

    protected logger: winston.Logger;

    constructor(private path: string, private port: number, rawConfig: WalletManagerConfig, options?: WalletManagerOptions) {
        this.logger = createLogger(options?.logger, options?.logLevel, { label: 'WalletManager' });
        this.managers = {} as Record<ChainName, SingleWalletManager>;

        this.grpcClientStub = new WalletManagerClient(`${path}:${port}`, grpc.credentials.createInsecure())

        // Constructing a record of manager for the only purpose of extracting the appropriate provider and private key
        //  to bundle together with the lock acquired from the grpc service.
        for (const [chainName, config] of Object.entries(rawConfig)) {
            if (!isChain(chainName)) throw new Error(`Invalid chain name: ${chainName}`);
            const network = config.network || getDefaultNetwork(chainName);

            const chainManagerConfig = {
                network,
                chainName,
                logger: this.logger,
                rebalance: {...config.rebalance, enabled: false},
                walletOptions: config.chainConfig,
            };

            this.managers[chainName] = new SingleWalletManager(chainManagerConfig, config.wallets);
        }
    }

    public async withWallet(chainName: ChainName, fn: WithWalletExecutor, opts?: WalletExecuteOptions): Promise<void> {
        const chainManager = this.managers[chainName];
        if (!chainManager) throw new Error(`No wallets configured for chain: ${chainName}`)

        const acquireRequest = new AcquireLockRequest()
        acquireRequest.setChainName(chainName);
        opts?.address ? acquireRequest.setAddress(opts.address) : acquireRequest.clearAddress();
        opts?.leaseTimeout ? acquireRequest.setLeaseTimeout(opts.leaseTimeout) : acquireRequest.clearLeaseTimeout();

        const promiseAcquireLock = util.promisify(this.grpcClientStub.acquireLock).bind(this.grpcClientStub)
        const acquireResponse = await promiseAcquireLock(acquireRequest)
        const acquiredAddress = acquireResponse.getAddress()

        // FIXME
        // Dirty solution. We are doing as little work as possible to get the same expected WalletInterface after
        //  locking.
        // Unfortunately this is not only inefficient (we lock 2 times) but also nonsense because, if we successfully
        //  locked a particular address in the wallet manager service, it's impossible that we have it locked here.
        // Nevertheless, this should allow us to just make it work right now.
        const acquiredWallet = await this.managers[chainName].acquireLock({...opts, address: acquiredAddress})

        try {
            return fn(acquiredWallet);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await Promise.all([
                this.grpcClientStub.releaseLock({chainName, address: acquiredAddress}),
                this.managers[chainName].releaseLock(acquiredAddress)
            ])
        }
    }
}