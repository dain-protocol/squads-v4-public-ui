import { PublicKey } from "@solana/web3.js";
import { createProgramConfigSetAuthorityInstruction } from "../generated";
import * as pda from "../pda";
import {
    PROGRAM_ID,
  } from "../generated";

export function programConfigSetAuthority({
  authority,
  newAuthority,
}: {
  authority: PublicKey;
  newAuthority: PublicKey;
}) {
  
  const [programPDA] = pda.getProgramConfigPda({programId: PROGRAM_ID});
  return createProgramConfigSetAuthorityInstruction(
    {
      authority,
      programConfig:programPDA ,
    },
    {
      args: {
       newAuthority,
      },
    },
    PROGRAM_ID
  );
}
