/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  ProposalVoteArgs,
  proposalVoteArgsBeet,
} from '../types/ProposalVoteArgs'

/**
 * @category Instructions
 * @category ProposalCancel
 * @category generated
 */
export type ProposalCancelInstructionArgs = {
  args: ProposalVoteArgs
}
/**
 * @category Instructions
 * @category ProposalCancel
 * @category generated
 */
export const proposalCancelStruct = new beet.FixableBeetArgsStruct<
  ProposalCancelInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', proposalVoteArgsBeet],
  ],
  'ProposalCancelInstructionArgs'
)
/**
 * Accounts required by the _proposalCancel_ instruction
 *
 * @property [] multisig
 * @property [_writable_, **signer**] member
 * @property [_writable_] proposal
 * @category Instructions
 * @category ProposalCancel
 * @category generated
 */
export type ProposalCancelInstructionAccounts = {
  multisig: web3.PublicKey
  member: web3.PublicKey
  proposal: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const proposalCancelInstructionDiscriminator = [
  27, 42, 127, 237, 38, 163, 84, 203,
]

/**
 * Creates a _ProposalCancel_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ProposalCancel
 * @category generated
 */
export function createProposalCancelInstruction(
  accounts: ProposalCancelInstructionAccounts,
  args: ProposalCancelInstructionArgs,
  programId = new web3.PublicKey('6M3m99oQihMH3korkRZMTxgh21FrMLXFAVertuQdPT9z')
) {
  const [data] = proposalCancelStruct.serialize({
    instructionDiscriminator: proposalCancelInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.multisig,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.member,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.proposal,
      isWritable: true,
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
