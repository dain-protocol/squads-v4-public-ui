/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  MultisigAddMemberArgs,
  multisigAddMemberArgsBeet,
} from '../types/MultisigAddMemberArgs'

/**
 * @category Instructions
 * @category MultisigAddMember
 * @category generated
 */
export type MultisigAddMemberInstructionArgs = {
  args: MultisigAddMemberArgs
}
/**
 * @category Instructions
 * @category MultisigAddMember
 * @category generated
 */
export const multisigAddMemberStruct = new beet.FixableBeetArgsStruct<
  MultisigAddMemberInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', multisigAddMemberArgsBeet],
  ],
  'MultisigAddMemberInstructionArgs'
)
/**
 * Accounts required by the _multisigAddMember_ instruction
 *
 * @property [_writable_] multisig
 * @property [**signer**] configAuthority
 * @property [_writable_, **signer**] rentPayer (optional)
 * @category Instructions
 * @category MultisigAddMember
 * @category generated
 */
export type MultisigAddMemberInstructionAccounts = {
  multisig: web3.PublicKey
  configAuthority: web3.PublicKey
  rentPayer?: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const multisigAddMemberInstructionDiscriminator = [
  1, 219, 215, 108, 184, 229, 214, 8,
]

/**
 * Creates a _MultisigAddMember_ instruction.
 *
 * Optional accounts that are not provided default to the program ID since
 * this was indicated in the IDL from which this instruction was generated.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category MultisigAddMember
 * @category generated
 */
export function createMultisigAddMemberInstruction(
  accounts: MultisigAddMemberInstructionAccounts,
  args: MultisigAddMemberInstructionArgs,
  programId = new web3.PublicKey('6M3m99oQihMH3korkRZMTxgh21FrMLXFAVertuQdPT9z')
) {
  const [data] = multisigAddMemberStruct.serialize({
    instructionDiscriminator: multisigAddMemberInstructionDiscriminator,
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
