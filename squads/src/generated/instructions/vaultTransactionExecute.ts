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
 * @category VaultTransactionExecute
 * @category generated
 */
export const vaultTransactionExecuteStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'VaultTransactionExecuteInstructionArgs'
)
/**
 * Accounts required by the _vaultTransactionExecute_ instruction
 *
 * @property [] multisig
 * @property [_writable_] proposal
 * @property [] transaction
 * @property [**signer**] member
 * @category Instructions
 * @category VaultTransactionExecute
 * @category generated
 */
export type VaultTransactionExecuteInstructionAccounts = {
  multisig: web3.PublicKey
  proposal: web3.PublicKey
  transaction: web3.PublicKey
  member: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const vaultTransactionExecuteInstructionDiscriminator = [
  194, 8, 161, 87, 153, 164, 25, 171,
]

/**
 * Creates a _VaultTransactionExecute_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category VaultTransactionExecute
 * @category generated
 */
export function createVaultTransactionExecuteInstruction(
  accounts: VaultTransactionExecuteInstructionAccounts,
  programId = new web3.PublicKey('6M3m99oQihMH3korkRZMTxgh21FrMLXFAVertuQdPT9z')
) {
  const [data] = vaultTransactionExecuteStruct.serialize({
    instructionDiscriminator: vaultTransactionExecuteInstructionDiscriminator,
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
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.member,
      isWritable: false,
      isSigner: true,
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
