import { PublicKey } from "@solana/web3.js";
import { createProgramConfigSetTreasuryInstruction } from "../generated";
import * as pda from "../pda";
import {
    PROGRAM_ID,
  } from "../generated";

export function programConfigSetTreasury({
  authority,
  newTreasury,
}: {
  authority: PublicKey;
  newTreasury: PublicKey;
}) {
  
  const [programPDA] = pda.getProgramConfigPda({programId: PROGRAM_ID});
  return createProgramConfigSetTreasuryInstruction(
    {
      authority,
      programConfig:programPDA ,
    },
    {
      args: {
       newTreasury,
      },
    },
    PROGRAM_ID
  );
}
