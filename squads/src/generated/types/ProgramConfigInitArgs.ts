/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js'
import * as beet from '@metaplex-foundation/beet'
import * as beetSolana from '@metaplex-foundation/beet-solana'
export type ProgramConfigInitArgs = {
  authority: web3.PublicKey
  multisigCreationFee: beet.bignum
  treasury: web3.PublicKey
}

/**
 * @category userTypes
 * @category generated
 */
export const programConfigInitArgsBeet =
  new beet.BeetArgsStruct<ProgramConfigInitArgs>(
    [
      ['authority', beetSolana.publicKey],
      ['multisigCreationFee', beet.u64],
      ['treasury', beetSolana.publicKey],
    ],
    'ProgramConfigInitArgs'
  )
