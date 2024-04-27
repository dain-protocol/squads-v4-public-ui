import { PublicKey } from "@solana/web3.js";
import { createProgramConfigInitInstruction } from "../generated";
import * as pda from "../pda";
import {
    PROGRAM_ID,
  } from "../generated";
import { bignum } from "@metaplex-foundation/beet";

export function programConfigInit({
  initializer,
  multisigCreationFee,
  treasury,
}: {
  initializer: PublicKey;
  multisigCreationFee: bignum;
  treasury: PublicKey;
}) {
  
  const [programPDA] = pda.getProgramConfigPda({programId: PROGRAM_ID});
  return createProgramConfigInitInstruction(
    {
      initializer,
      programConfig:programPDA ,
    },
    {
      args: {
        authority: initializer,
        multisigCreationFee,
        treasury,
      },
    },
    PROGRAM_ID
  );
}
