export const DEVNET = 'devnet';

import { EvmWalletOptions, EvmWalletToolbox, EVM_CHAIN_CONFIGS, EVMChainName, EvmNetworks } from './evm';
import {SOLANA_CHAIN_CONFIGS, SOLANA_CHAINS, SolanaChainName, SolanaWalletOptions, SolanaWalletToolbox} from "./solana";
import { SuiWalletToolbox, SUI_CHAINS, SuiChainName, SuiWalletOptions, SUI_CHAIN_CONFIGS } from './sui';
import {SolanaNetworks} from "./solana/solana.config";

export const KNOWN_CHAINS = {
  ...SUI_CHAIN_CONFIGS,
  ...EVM_CHAIN_CONFIGS,
  ...SOLANA_CHAIN_CONFIGS,
}

export type ChainName = EVMChainName | SolanaChainName | SuiChainName;
export type Wallet = EvmWalletToolbox | SolanaWalletToolbox | SuiWalletToolbox;
export type WalletOptions = EvmWalletOptions | SolanaWalletOptions | SuiWalletOptions;

export type WalletConfig = {
  address?: string;
  tokens?: string[];
  privateKey?: string;
}

export type Balance = {
  symbol: string;
  address: string;
  isNative: boolean;
  rawBalance: string;
  formattedBalance: string;
}

export type TokenBalance = Balance & {
  tokenAddress?: string; // Why can solana tokens not have a token address?
}

export type WalletBalance = Balance & {
  tokens: TokenBalance[];
}

export type AllNetworks = EvmNetworks | SolanaNetworks

export function isChain (chainName: string): chainName is ChainName {
  return chainName in KNOWN_CHAINS;
}

export function isEvmChain(chainName: ChainName): chainName is EVMChainName {
  return chainName in EVM_CHAIN_CONFIGS;
}

export function isSolanaChain(chainName: ChainName): chainName is SolanaChainName {
  return chainName in SOLANA_CHAINS;
}

export function isSuiChain(chainName: ChainName): chainName is SuiChainName {
  return chainName in SUI_CHAINS;
};

export function createWalletToolbox(
  network: string, chainName: string, wallets: WalletConfig[], walletOptions: WalletOptions
): Wallet {
  if (!isChain(chainName)) throw new Error('Unknown chain name ' + chainName);

  switch (true) {
    case isEvmChain(chainName):
      return new EvmWalletToolbox(
        network,
        chainName as EVMChainName,
        wallets,
        walletOptions);

    case isSolanaChain(chainName):
      return new SolanaWalletToolbox(network, chainName as SolanaChainName, wallets, walletOptions);

    case isSuiChain(chainName):
      return new SuiWalletToolbox(network, chainName as SuiChainName, wallets, walletOptions as SuiWalletOptions);

    default:
      throw new Error(`Unknown chain name ${chainName}`);
  }
}
