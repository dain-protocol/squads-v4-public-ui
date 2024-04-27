/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  ProgramConfigSetTreasuryArgs,
  programConfigSetTreasuryArgsBeet,
} from '../types/ProgramConfigSetTreasuryArgs'

/**
 * @category Instructions
 * @category ProgramConfigSetTreasury
 * @category generated
 */
export type ProgramConfigSetTreasuryInstructionArgs = {
  args: ProgramConfigSetTreasuryArgs
}
/**
 * @category Instructions
 * @category ProgramConfigSetTreasury
 * @category generated
 */
export const programConfigSetTreasuryStruct = new beet.BeetArgsStruct<
  ProgramConfigSetTreasuryInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', programConfigSetTreasuryArgsBeet],
  ],
  'ProgramConfigSetTreasuryInstructionArgs'
)
/**
 * Accounts required by the _programConfigSetTreasury_ instruction
 *
 * @property [_writable_] programConfig
 * @property [**signer**] authority
 * @category Instructions
 * @category ProgramConfigSetTreasury
 * @category generated
 */
export type ProgramConfigSetTreasuryInstructionAccounts = {
  programConfig: web3.PublicKey
  authority: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const programConfigSetTreasuryInstructionDiscriminator = [
  111, 46, 243, 117, 144, 188, 162, 107,
]

/**
 * Creates a _ProgramConfigSetTreasury_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ProgramConfigSetTreasury
 * @category generated
 */
export function createProgramConfigSetTreasuryInstruction(
  accounts: ProgramConfigSetTreasuryInstructionAccounts,
  args: ProgramConfigSetTreasuryInstructionArgs,
  programId = new web3.PublicKey('6M3m99oQihMH3korkRZMTxgh21FrMLXFAVertuQdPT9z')
) {
  const [data] = programConfigSetTreasuryStruct.serialize({
    instructionDiscriminator: programConfigSetTreasuryInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.programConfig,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.authority,
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