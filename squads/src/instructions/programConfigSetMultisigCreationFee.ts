import { PublicKey } from "@solana/web3.js";
import { createProgramConfigSetMultisigCreationFeeInstruction } from "../generated";
import * as pda from "../pda";
import {
    PROGRAM_ID,
  } from "../generated";
  import { bignum } from "@metaplex-foundation/beet";
  
export function programConfigSetMultisigCreationFee({
  authority,
  newMultisigCreationFee,
}: {
  authority: PublicKey;
  newMultisigCreationFee: bignum;
}) {
  
  const [programPDA] = pda.getProgramConfigPda({programId: PROGRAM_ID});
  return createProgramConfigSetMultisigCreationFeeInstruction(
    {
      authority,
      programConfig:programPDA ,
    },
    {
      args: {
       newMultisigCreationFee,
      },
    },
    PROGRAM_ID
  );
}
