/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  VaultTransactionCreateArgs,
  vaultTransactionCreateArgsBeet,
} from '../types/VaultTransactionCreateArgs'

/**
 * @category Instructions
 * @category VaultTransactionCreate
 * @category generated
 */
export type VaultTransactionCreateInstructionArgs = {
  args: VaultTransactionCreateArgs
}
/**
 * @category Instructions
 * @category VaultTransactionCreate
 * @category generated
 */
export const vaultTransactionCreateStruct = new beet.FixableBeetArgsStruct<
  VaultTransactionCreateInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', vaultTransactionCreateArgsBeet],
  ],
  'VaultTransactionCreateInstructionArgs'
)
/**
 * Accounts required by the _vaultTransactionCreate_ instruction
 *
 * @property [_writable_] multisig
 * @property [_writable_] transaction
 * @property [**signer**] creator
 * @property [_writable_, **signer**] rentPayer
 * @category Instructions
 * @category VaultTransactionCreate
 * @category generated
 */
export type VaultTransactionCreateInstructionAccounts = {
  multisig: web3.PublicKey
  transaction: web3.PublicKey
  creator: web3.PublicKey
  rentPayer: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const vaultTransactionCreateInstructionDiscriminator = [
  48, 250, 78, 168, 208, 226, 218, 211,
]

/**
 * Creates a _VaultTransactionCreate_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category VaultTransactionCreate
 * @category generated
 */
export function createVaultTransactionCreateInstruction(
  accounts: VaultTransactionCreateInstructionAccounts,
  args: VaultTransactionCreateInstructionArgs,
  programId = new web3.PublicKey('6M3m99oQihMH3korkRZMTxgh21FrMLXFAVertuQdPT9z')
) {
  const [data] = vaultTransactionCreateStruct.serialize({
    instructionDiscriminator: vaultTransactionCreateInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.multisig,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.transaction,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.creator,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.rentPayer,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ]

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc)
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}
