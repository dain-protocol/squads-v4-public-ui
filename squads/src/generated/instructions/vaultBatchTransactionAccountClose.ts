/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'

/**
 * @category Instructions
 * @category VaultBatchTransactionAccountClose
 * @category generated
 */
export const vaultBatchTransactionAccountCloseStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'VaultBatchTransactionAccountCloseInstructionArgs'
)
/**
 * Accounts required by the _vaultBatchTransactionAccountClose_ instruction
 *
 * @property [] multisig
 * @property [] proposal
 * @property [_writable_] batch
 * @property [_writable_] transaction
 * @property [_writable_] rentCollector
 * @category Instructions
 * @category VaultBatchTransactionAccountClose
 * @category generated
 */
export type VaultBatchTransactionAccountCloseInstructionAccounts = {
  multisig: web3.PublicKey
  proposal: web3.PublicKey
  batch: web3.PublicKey
  transaction: web3.PublicKey
  rentCollector: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const vaultBatchTransactionAccountCloseInstructionDiscriminator = [
  134, 18, 19, 106, 129, 68, 97, 247,
]

/**
 * Creates a _VaultBatchTransactionAccountClose_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category VaultBatchTransactionAccountClose
 * @category generated
 */
export function createVaultBatchTransactionAccountCloseInstruction(
  accounts: VaultBatchTransactionAccountCloseInstructionAccounts,
  programId = new web3.PublicKey('6M3m99oQihMH3korkRZMTxgh21FrMLXFAVertuQdPT9z')
) {
  const [data] = vaultBatchTransactionAccountCloseStruct.serialize({
    instructionDiscriminator:
      vaultBatchTransactionAccountCloseInstructionDiscriminator,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.multisig,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.proposal,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.batch,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.transaction,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.rentCollector,
      isWritable: true,
      isSigner: false,
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
