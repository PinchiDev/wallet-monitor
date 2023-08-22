import { DEVNET } from '../index';
const SEI_TESTNET = 'atlantic-2';
const SEI_DEVNET = 'sei-devnet';
const SEI_MAINNET = 'pacific-1';
const SEI_CURRENCY_SYMBOL = 'SEI';

export const SEI = 'SEI';

export const SEI_NETWORKS = {
  [SEI_TESTNET]: 1,
  [SEI_DEVNET]: 2,
  [SEI_MAINNET]: 3,
}

export const SEI_KNOWN_TOKENS = {
  // TBD
  [SEI_TESTNET]: {
    "SEI": "usei",
    "UST2": "sei1jdppe6fnj2q7hjsepty5crxtrryzhuqsjrj95y",
    "WETH": "sei1dkdwdvknx0qav5cp5kw68mkn3r99m3svkyjfvkztwh97dv2lm0ksj6xrak/AAxKX63hpBQrGGf6uhB21dJuXupvHxNTHJaktAETVGh6",
    "WMATIC": "sei1dkdwdvknx0qav5cp5kw68mkn3r99m3svkyjfvkztwh97dv2lm0ksj6xrak/8QZuMFhH8FYUGpJNs9YhtuEm76pEzo4NjAYQiYM1vY8y",
    "WAVAX": "sei1dkdwdvknx0qav5cp5kw68mkn3r99m3svkyjfvkztwh97dv2lm0ksj6xrak/Fg1hDnTsAyWPVjDUN2vqjwVThwmnuEXBg2eGUGewWDUp",
    "SOL": "sei1dkdwdvknx0qav5cp5kw68mkn3r99m3svkyjfvkztwh97dv2lm0ksj6xrak/GotfBk8VUDfbqgTJgF1nhV7bfZgUxfWiwADNLKv5PEMS",
  },
  [SEI_DEVNET]: {
    "SEI": "usei",
    "UST2": "sei1jdppe6fnj2q7hjsepty5crxtrryzhuqsjrj95y"
  },
  [SEI_MAINNET]: {
    "SEI": "usei",
    "USDCet": "sei189adguawugk3e55zn63z8r9ll29xrjwca636ra7v7gxuzn98sxyqwzt47l/Hq4tuDzhRBnxw3tFA5n6M52NVMVcC19XggbyDiJKCD6H",
    "WBTC": "sei189adguawugk3e55zn63z8r9ll29xrjwca636ra7v7gxuzn98sxyqwzt47l/7omXa4gryZ5NiBmLep7JsTtTtANCVKXwT9vbN91aS1br",
    "USDCar": "sei189adguawugk3e55zn63z8r9ll29xrjwca636ra7v7gxuzn98sxyqwzt47l/7edDfnf4mku8So3t4Do215GNHwASEwCWrdhM5GqD51xZ",
    "UDCpo": "sei189adguawugk3e55zn63z8r9ll29xrjwca636ra7v7gxuzn98sxyqwzt47l/DUVFMY2neJdL8aE4d3stcpttDDm5aoyfGyVvm29iA9Yp",
    "USDCop": "sei189adguawugk3e55zn63z8r9ll29xrjwca636ra7v7gxuzn98sxyqwzt47l/3VKKYtbQ9iq8f9CaZfgR6Cr3TUj6ypXPAn6kco6wjcAu",
    "USDCso": "sei189adguawugk3e55zn63z8r9ll29xrjwca636ra7v7gxuzn98sxyqwzt47l/9fELvUhFo6yWL34ZaLgPbCPzdk9MD1tAzMycgH45qShH",
    "USDTbs": "sei189adguawugk3e55zn63z8r9ll29xrjwca636ra7v7gxuzn98sxyqwzt47l/871jbn9unTavWsAe83f2Ma9GJWSv6BKsyWYLiQ6z3Pva",
  },
  [DEVNET]: {},
}

const SEI_DEFAULT_TOKEN_POLL_CONCURRENCY = 10;

export const SEI_DEFAULT_CONFIGS = {
  [SEI_TESTNET]: {
    nodeUrl: 'https://rpc-sei-testnet.rhinostake.com',
    tokenPollConcurrency: SEI_DEFAULT_TOKEN_POLL_CONCURRENCY,
  },
  [SEI_DEVNET]: {
    nodeUrl: 'https://sei-devnet-rpc.brocha.in/',
    tokenPollConcurrency: SEI_DEFAULT_TOKEN_POLL_CONCURRENCY,
  },
  [SEI_MAINNET]: {
    nodeUrl: 'https://rpc-sei.rhinostake.com',
    tokenPollConcurrency: SEI_DEFAULT_TOKEN_POLL_CONCURRENCY,
  },
  [DEVNET]: {
    nodeUrl: 'http://localhost:8545',
    tokenPollConcurrency: SEI_DEFAULT_TOKEN_POLL_CONCURRENCY,
  },
}

export const SEI_CHAIN_CONFIG = {
  nodeUrl:SEI_DEFAULT_CONFIGS[SEI_TESTNET].nodeUrl,
  chainName: SEI,
  networks: SEI_NETWORKS,
  defaultNetwork: SEI_TESTNET,
  knownTokens: SEI_KNOWN_TOKENS,
  defaultConfigs: SEI_DEFAULT_CONFIGS,
  nativeCurrencySymbol: SEI_CURRENCY_SYMBOL,
}

export type SeiNetworks = keyof typeof SEI_NETWORKS;
export type KnownSeiTokens = keyof typeof SEI_KNOWN_TOKENS;