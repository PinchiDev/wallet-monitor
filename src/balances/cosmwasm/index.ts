import { SigningCosmWasmClient } from "cosmwasm";
var crypto = require('crypto'); //importing the other way gave me errors check this

export async function pullCosmWasmNativeBalance(client: any , address: string, searchDenom: string) {
     
  const balance = await client.getBalance(address, searchDenom);
  const rawBalance = balance.toString();
  
  return rawBalance;

};

export async function pullCosmWasmTokenBalance(client: any, wallet: any, searchDenom: string[]) {

  const balance = await client.getBalance(wallet, searchDenom);
  const rawBalance = balance.toString();

  return rawBalance;
};

export async function pullCosmWasmTokenData(client: any, tokenAddress: string) {

  const tokenInfo = await client.getContractInfo(tokenAddress);
  const tokenData = tokenInfo.toString();

  return tokenData;
};

export function getCosmWasmAddressFromPrivateKey(privateKey: string): string {
  
  const privateKeyBuffer = Buffer.from(privateKey, 'hex');
  const publicKeyBuffer = crypto.publicEncrypt(
    Buffer.from('00', 'hex'),
    privateKeyBuffer,
  );
  const publicKey = publicKeyBuffer.toString('hex');
  const address = publicKey.slice(0, 20);

  return address;
};

export async function transferCosmWasmNativeBalance (privateKey: string, client: SigningCosmWasmClient) {
  // const transfer = await client.transfer(privateKey, targetAddress, amount, maxGasPrice, gasLimit); // how can i 
  // const receipt = transfer.toString();
  // return receipt;
};