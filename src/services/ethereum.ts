import Web3 from 'web3'
import {KeyProps} from '@app/types/item'

export function generateEthereumWallet(): KeyProps {
  const web3 = new Web3()
  const account = web3.eth.accounts.create()

  return {
    publicKey: account.address,
    privateKey: account.privateKey,
  }
}
