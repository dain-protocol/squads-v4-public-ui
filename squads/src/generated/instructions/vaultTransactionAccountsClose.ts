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
 * @category VaultTransactionAccountsClose
 * @category generated
 */
export const vaultTransactionAccountsCloseStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'VaultTransactionAccountsCloseInstructionArgs'
)
/**
 * Accounts required by the _vaultTransactionAccountsClose_ instruction
 *
 * @property [] multisig
 * @property [_writable_] proposal
 * @property [_writable_] transaction
 * @property [_writable_] rentCollector
 * @category Instructions
 * @category VaultTransactionAccountsClose
 * @category generated
 */
export type VaultTransactionAccountsCloseInstructionAccounts = {
  multisig: web3.PublicKey
  proposal: web3.PublicKey
  transaction: web3.PublicKey
  rentCollector: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const vaultTransactionAccountsCloseInstructionDiscriminator = [
  196, 71, 187, 176, 2, 35, 170, 165,
]

/**
 * Creates a _VaultTransactionAccountsClose_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category VaultTransactionAccountsClose
 * @category generated
 */
export function createVaultTransactionAccountsCloseInstruction(
  accounts: VaultTransactionAccountsCloseInstructionAccounts,
  programId = new web3.PublicKey('6M3m99oQihMH3korkRZMTxgh21FrMLXFAVertuQdPT9z')
) {
  const [data] = vaultTransactionAccountsCloseStruct.serialize({
    instructionDiscriminator:
      vaultTransactionAccountsCloseInstructionDiscriminator,
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
