import { CosmWasmClient } from "cosmwasm";


export async function pullCosmWasmNativeBalance(client: any , address: string, searchDenom: string) {
     
  const balance = await client.getBalance(address, searchDenom);
  const rawBalance = balance.toString();
  return rawBalance;

};
//getBalance alrready is a method that call pull token balances given the searchDenom, should i use the pullCosmWasmNativeBalance method here?
export async function pullCosmWasmTokenBalance(client: any, tokenAddress: string, address: string) {
  const balance = await client.getBalance(address, tokenAddress);
  const rawBalance = balance.toString();
  return rawBalance;
};

export async function pullCosmWasmTokenData(client: any, tokenAddress: string) {
  const tokenInfo = await client.getContractInfo(tokenAddress);
  const tokenData = tokenInfo.toString();
  return tokenData;
};

export async function getCosmWasmAddressFromPrivateKey(client: any, privateKey: string) {
  const info = await client.getAccount(privateKey);
};

export async function transferCosmWasmNativeBalance (privateKey: string, client: CosmWasmClient) {
  // const transfer = await client.transfer(privateKey, targetAddress, amount, maxGasPrice, gasLimit); // how can i 
  // const receipt = transfer.toString();
  // return receipt;
};