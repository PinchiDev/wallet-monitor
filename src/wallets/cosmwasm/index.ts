import { WalletConfig, WalletBalance, TokenBalance } from '../';
import { mapConcurrent } from '../../utils';
import { WalletToolbox, BaseWalletOptions, TransferRecepit } from '../base-wallet';
import { SeiNetworks, SEI_CHAIN_CONFIG, SEI } from './sei.config';
import {
   /*  pullCosmWasmNativeBalance,
    pullCosmWasmTokenBalance,
    transferCosmWasmNativeBalance,
    getCosmWasmAddressFromPrivateKey, */
    pullCosmWasmTokenData
 } from '../../balances/cosmwasm';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export const COSMWASM_CHAINS = {
    [SEI]: 1,
};
const COSMWASM_HEX_ADDRESS_REGEX = /^cosmos1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}$/; 

type CosmWasmChainConfig = {
  chainName: string;
  nativeCurrencySymbol: string;
  knownTokens: Record<string, Record<string, string>>;
  defaultConfigs: Record<string, { nodeUrl: string }>;
  networks: Record<string, number>;
  defaultNetwork: string;
}

type CosmWasmDefaultConfig = {
  chainName: string;
  nativeCurrencySymbol: string;
  knownTokens: Record<string, Record<string, string>>;
  defaultConfigs: Record<string, { nodeUrl: string }>;
  networks: Record<string, number>;
  defaultNetwork: string;
}

export type CosmWasmDefaultConfigs = Record<string, CosmWasmDefaultConfig>; //what info do i need in cosmwasm defaults config?

export type CosmWasmChainName = keyof typeof COSMWASM_CHAINS;

export const COSMWASM_CHAIN_CONFIGS: Record<CosmWasmChainName, CosmWasmDefaultConfig> = {
    [SEI]: SEI_CHAIN_CONFIG,
};

export type CosmWasmWalletOptions = BaseWalletOptions & {
  signer: string;
  address: string;
  nodeUrl: string;
  tokenPollConcurrency?: number;
}

export type CosmWasmNetworks = SeiNetworks ;

function getUniqueTokens(wallets: WalletConfig[]): string[] {
  const tokens = wallets.reduce((acc, wallet) => {
    return wallet.tokens ? [...acc, ...wallet.tokens] : acc;
  }, [] as string[]);

  return [...new Set(tokens)];
}

export class CosmWasmWalletToolbox extends WalletToolbox {
  private chainConfig: CosmWasmChainConfig;
  private tokenData: Record<string, symbol > = {};
  public options: CosmWasmWalletOptions;
  connection?: any;

  constructor(
    public network: string,
    public chainName: CosmWasmChainName,
    public rawConfig: WalletConfig[],
    options: CosmWasmWalletOptions,
  ) {
    super(network, chainName, rawConfig, options);
    this.chainConfig = COSMWASM_CHAIN_CONFIGS[this.chainName];

    const defaultOptions = this.chainConfig.defaultConfigs[this.network];

    this.options = { ...defaultOptions, ...options } as CosmWasmWalletOptions;

    this.logger.debug(`CosmWasm rpc url: ${this.options.nodeUrl}`);

  }

  public validateChainName(chainName: string): chainName is CosmWasmChainName {
    if (!(chainName in COSMWASM_CHAIN_CONFIGS)) throw new Error(`Invalid chain name "${chainName}" for CosmWasm wallet`);
    return true;
  }

  public validateNetwork(network: string): network is CosmWasmNetworks {
    if (!(network in this.chainConfig.networks)) throw new Error(`Invalid network "${network}" for chain: ${this.chainName}`);

    return true;
  }

  public validateOptions(options: any): options is CosmWasmWalletOptions {
    if (!options) return true;
    if (typeof options !== 'object') throw new Error(`Invalid options for chain: ${this.chainName}`);
    return true;
  }

  public validateTokenAddress(token: any) {
    const chainConfig = this.chainConfig;

    if (typeof token !== 'string')
      throw new Error(`Invalid config for chain: ${this.chainName}: Invalid token`);
    if (
      !COSMWASM_HEX_ADDRESS_REGEX.test(token) &&
      !(token.toUpperCase() in chainConfig.knownTokens[this.network])
    ) {
      throw new Error(`Invalid token config for chain: ${this.chainName}: Invalid token "${token}"`);
    }    

    return true;
  }

  public parseTokensConfig(tokens: string[]): string[] {
    
    return tokens ? tokens.map((token) => {
      if (COSMWASM_HEX_ADDRESS_REGEX.test(token)) {
        return token;
      }
      return this.chainConfig.knownTokens[this.network][token.toUpperCase()];
    }) : [];
  }

  public async warmup() {
    const uniqueTokens = getUniqueTokens(Object.values(this.wallets));

    await mapConcurrent(uniqueTokens, async (tokenAddress) => {
      this.tokenData[tokenAddress] = await pullCosmWasmTokenData(this.connection, tokenAddress);
    }, this.options.tokenPollConcurrency);

    this.logger.debug(`CosmWasm token data: ${JSON.stringify(this.tokenData)}`);

    this.connection = this.stablishConnection(this.options.nodeUrl)
  }

  public async stablishConnection(nodeUrl: string) {
    const connectedClient = await CosmWasmClient.connect(nodeUrl)
    return connectedClient
    }

  
  public async pullNativeBalance(address: string): Promise<WalletBalance> {
    throw new Error('Not implemented');
  }

  public async pullTokenBalances(address: string, searchDenom: string[]): Promise<TokenBalance[]> {
    throw new Error('Not implemented');
  }

  public async transferNativeBalance(
    privateKey: string, targetAddress: string, amount: number, maxGasPrice?: number, gasLimit?: number,
  ): Promise<TransferRecepit> {  
    throw new Error('Not implemented');
  }

  public getAddressFromPrivateKey(privateKey: string): string {
    throw new Error('Not implemented');
  }
}