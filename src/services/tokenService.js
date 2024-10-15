const StellarSdk = require('@stellar/stellar-sdk');
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

async function sendTokens(userPublicKey, amount, issuingSecretKey, distributionSecretKey) {
  const issuingKeypair = StellarSdk.Keypair.fromSecret(issuingSecretKey);
  const distributionKeypair = StellarSdk.Keypair.fromSecret(distributionSecretKey);

  const distributionAccount = await server.loadAccount(distributionKeypair.publicKey());

  const transaction = new StellarSdk.TransactionBuilder(distributionAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    .addOperation(StellarSdk.Operation.payment({
      destination: userPublicKey,
      asset: new StellarSdk.Asset('GAME_TOKEN', issuingKeypair.publicKey()),
      amount: amount.toString(),
    }))
    .setTimeout(30)
    .build();

  transaction.sign(distributionKeypair);
  const result = await server.submitTransaction(transaction);
  return result;
}

module.exports = {
  sendTokens,
};