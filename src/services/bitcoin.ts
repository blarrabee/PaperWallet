import {KeyProps} from '@app/types/item'

const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

export function generateBitcoinWallet(): KeyProps {
  const network = bitcoin.networks.bitcoin
  const path = `m/49'/0'/0'/0`
  const mnemonic = bip39.generateMnemonic()
  const seed = bip39.mnemonicToSeedSync(mnemonic)
  const root = bip32.fromSeed(seed, network)

  const account = root.derivePath(path)
  const node = account.derive(0).derive(0)

  const btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
  }).address

  return {
    publicKey: btcAddress,
    privateKey: node.toWIF(),
  }
}
