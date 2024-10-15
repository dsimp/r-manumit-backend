const StellarSdk = require('@stellar/stellar-sdk');
const fetch = require('node-fetch');

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

async function createWallet() {
  const pair = StellarSdk.Keypair.random();
  console.log("Public Key:", pair.publicKey());
  console.log("Secret Key:", pair.secret());

  // Fund the account for development purposes using Stellar's Friendbot
  const response = await fetch(`https://friendbot.stellar.org?addr=${pair.publicKey()}`);
  console.log('Friendbot Response:', await response.json());

  return {
    publicKey: pair.publicKey(),
    secretKey: pair.secret(),
  };
}

module.exports = {
  createWallet,
};