import { SigningCosmWasmClient, CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet, OfflineSigner } from '@cosmjs/proto-signing'
import {
  assertIsDeliverTxSuccess,
  StdFee,
  calculateFee,
  GasPrice,
  coins,
} from '@cosmjs/stargate'
import crypto from "crypto"


export async function pullCosmWasmNativeBalance(nodeUrl: string, searchDenom: string, wallet: string) {
  const client = await CosmWasmClient.connect(nodeUrl)
  const balance = await client.getBalance(wallet, searchDenom);
  const rawBalance = balance.toString();
  
  return {rawBalance};

};

export async function pullCosmWasmTokenBalance(nodeUrl: string, searchDenom: string, wallet: string) {
  const client = await CosmWasmClient.connect(nodeUrl)
  const balance = await client.getBalance(wallet, searchDenom);
  const rawBalance = balance.toString();

  return {rawBalance};
};

export async function pullCosmWasmTokenData(nodeUrl: string, tokenAddress: string) {
 /*  const client = await CosmWasmClient.connect(nodeUrl)
  const tokenInfo = await client.getCodeDetails(tokenAddress);// i couldn`t find a method that retrives the token info. what should i do here?
  const tokenData = tokenInfo.toString(); */

  return Symbol();
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

export async function transferCosmWasmNativeBalance (client: SigningCosmWasmClient, wallet: OfflineSigner, rpcEndpoint: string, recipient: string, amount: any) {

/*   const client = await SigningStargateClient.connectWithSigner(
    rpcEndpoint,
    wallet,
  ) */

  const [firstAccount] = await wallet.getAccounts()

  const defaultGasPrice = GasPrice.fromString('0.025uatom') //how should i calculate the gas and fee?
  const defaultSendFee: StdFee = calculateFee(80_000, defaultGasPrice) // here i need the gas limit value as the first argument to pass

//  console.log('sender', firstAccount.address)
//  console.log('transactionFee', defaultSendFee)
//  console.log('amount', amount)

  const transaction = await client.sendTokens(
    firstAccount.address,
    recipient,
    amount,
    defaultSendFee,
    'Transaction',
  )
  assertIsDeliverTxSuccess(transaction) //tx confirmation
  console.log('Successfully broadcasted:', transaction)
};