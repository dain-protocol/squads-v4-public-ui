/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  MultisigSetRentCollectorArgs,
  multisigSetRentCollectorArgsBeet,
} from '../types/MultisigSetRentCollectorArgs'

/**
 * @category Instructions
 * @category MultisigSetRentCollector
 * @category generated
 */
export type MultisigSetRentCollectorInstructionArgs = {
  args: MultisigSetRentCollectorArgs
}
/**
 * @category Instructions
 * @category MultisigSetRentCollector
 * @category generated
 */
export const multisigSetRentCollectorStruct = new beet.FixableBeetArgsStruct<
  MultisigSetRentCollectorInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', multisigSetRentCollectorArgsBeet],
  ],
  'MultisigSetRentCollectorInstructionArgs'
)
/**
 * Accounts required by the _multisigSetRentCollector_ instruction
 *
 * @property [_writable_] multisig
 * @property [**signer**] configAuthority
 * @property [_writable_, **signer**] rentPayer (optional)
 * @category Instructions
 * @category MultisigSetRentCollector
 * @category generated
 */
export type MultisigSetRentCollectorInstructionAccounts = {
  multisig: web3.PublicKey
  configAuthority: web3.PublicKey
  rentPayer?: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const multisigSetRentCollectorInstructionDiscriminator = [
  48, 204, 65, 57, 210, 70, 156, 74,
]

/**
 * Creates a _MultisigSetRentCollector_ instruction.
 *
 * Optional accounts that are not provided default to the program ID since
 * this was indicated in the IDL from which this instruction was generated.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category MultisigSetRentCollector
 * @category generated
 */
export function createMultisigSetRentCollectorInstruction(
  accounts: MultisigSetRentCollectorInstructionAccounts,
  args: MultisigSetRentCollectorInstructionArgs,
  programId = new web3.PublicKey('6M3m99oQihMH3korkRZMTxgh21FrMLXFAVertuQdPT9z')
) {
  const [data] = multisigSetRentCollectorStruct.serialize({
    instructionDiscriminator: multisigSetRentCollectorInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.multisig,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.configAuthority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.rentPayer ?? programId,
      isWritable: accounts.rentPayer != null,
      isSigner: accounts.rentPayer != null,
    },
    {
      pubkey: accounts.systemProgram ?? programId,
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
