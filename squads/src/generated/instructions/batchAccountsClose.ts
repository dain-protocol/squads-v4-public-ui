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
 * @category BatchAccountsClose
 * @category generated
 */
export const batchAccountsCloseStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'BatchAccountsCloseInstructionArgs'
)
/**
 * Accounts required by the _batchAccountsClose_ instruction
 *
 * @property [] multisig
 * @property [_writable_] proposal
 * @property [_writable_] batch
 * @property [_writable_] rentCollector
 * @category Instructions
 * @category BatchAccountsClose
 * @category generated
 */
export type BatchAccountsCloseInstructionAccounts = {
  multisig: web3.PublicKey
  proposal: web3.PublicKey
  batch: web3.PublicKey
  rentCollector: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const batchAccountsCloseInstructionDiscriminator = [
  218, 196, 7, 175, 130, 102, 11, 255,
]

/**
 * Creates a _BatchAccountsClose_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category BatchAccountsClose
 * @category generated
 */
export function createBatchAccountsCloseInstruction(
  accounts: BatchAccountsCloseInstructionAccounts,
  programId = new web3.PublicKey('6M3m99oQihMH3korkRZMTxgh21FrMLXFAVertuQdPT9z')
) {
  const [data] = batchAccountsCloseStruct.serialize({
    instructionDiscriminator: batchAccountsCloseInstructionDiscriminator,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.multisig,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.proposal,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.batch,
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
