import { DEVNET } from '../index';
const SEI_TESTNET = 'testnet-atlantic2';
const SEI_DEVNET = 'sei-devnet-brochain';
const SEI_CURRENCY_SYMBOL = 'SEI';

export const SEI = 'SEI';

export const SEI_NETWORKS = {
  [SEI_TESTNET]: 1,
  [SEI_DEVNET]: 2,
}

export const SEI_KNOWN_TOKENS = {
  // TBD
  [SEI_TESTNET]: {
    "SEI": "5e718a29a8570602328e98705325d414225314b4",
    "UST2": "4227e94690292138855e519504f7155797d4d7a5"
  },
  [SEI_DEVNET]: {
    "SEI": "5e718a29a8570602328e98705325d414225314b4",
    "UST2": "4227e94690292138855e519504f7155797d4d7a5"
  },
  [DEVNET]: {},
}

const SEI_DEFAULT_TOKEN_POLL_CONCURRENCY = 10;

export const SEI_DEFAULT_CONFIGS = {
  [SEI_TESTNET]: {
    nodeUrl: 'https://rpc.atlantic-2.seinetwork.io/',
    tokenPollConcurrency: SEI_DEFAULT_TOKEN_POLL_CONCURRENCY,
  },
  [SEI_DEVNET]: {
    nodeUrl: 'https://sei-devnet-rpc.brocha.in/',
    tokenPollConcurrency: SEI_DEFAULT_TOKEN_POLL_CONCURRENCY,
  },
  [DEVNET]: {
    nodeUrl: 'http://localhost:8545',
    tokenPollConcurrency: SEI_DEFAULT_TOKEN_POLL_CONCURRENCY,
  },
}

export const SEI_CHAIN_CONFIG = {
  nodeUrl:SEI_DEFAULT_CONFIGS[SEI_TESTNET].nodeUrl, //check this with solano (type error in COSMWASM_CHAIN_CONFIGS)
  chainName: SEI,
  networks: SEI_NETWORKS,
  defaultNetwork: SEI_TESTNET,
  knownTokens: SEI_KNOWN_TOKENS,
  defaultConfigs: SEI_DEFAULT_CONFIGS,
  nativeCurrencySymbol: SEI_CURRENCY_SYMBOL,
}

export type SeiNetworks = keyof typeof SEI_NETWORKS;
export type KnownSeiTokens = keyof typeof SEI_KNOWN_TOKENS;