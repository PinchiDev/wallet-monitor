import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { OfflineSigner } from '@cosmjs/proto-signing'


export async function pullCosmWasmNativeBalance(nodeUrl: string, searchDenom: string, wallet: string) {
    throw new Error('Not implemented');
}

export async function pullCosmWasmTokenBalance(nodeUrl: string, searchDenom: string, wallet: string) {
    throw new Error('Not implemented');
}

export async function pullCosmWasmTokenData(connection: CosmWasmClient, tokenAddress: string): Promise<symbol> {
    throw new Error('Not implemented');
}

export function getCosmWasmAddressFromPrivateKey(privateKey: string): string {
    throw new Error('Not implemented');
}

export async function transferCosmWasmNativeBalance (client: CosmWasmClient, wallet: OfflineSigner, rpcEndpoint: string, recipient: string, amount: any) {
    throw new Error('Not implemented');
}