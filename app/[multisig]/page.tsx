import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { headers } from "next/headers";
import Image from "next/image";
import * as multisig from "@/squads/src";
import { TokenList } from "@/components/TokenList";
import { VaultDisplayer } from "@/components/VaultDisplayer";

export default async function Home({
  params,
  searchParams,
}: {
  params: { multisig: string };
  searchParams?: { prefill: string };
}) {
  const rpcUrl = headers().get("x-rpc-url");

  const connection = new Connection(
    rpcUrl || (process.env.NEXT_PUBLIC_RPC as string)
  );

  const multisigPda = new PublicKey(params.multisig!);
  const vaultIndex = Number(headers().get("x-vault-index"));
  const multisigVault = multisig.getVaultPda({
    multisigPda,
    index: vaultIndex || 0,
  })[0];

  const tokensInWallet = await connection.getParsedTokenAccountsByOwner(
    multisigVault,
    {
      programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
    }
  );

  return (
    <main className="">
      <div>
        <h1 className="text-3xl font-bold mb-4">Overview</h1>

        <VaultDisplayer
          multisigPdaString={params.multisig!}
          vaultIndex={vaultIndex || 0}
        />
        <TokenList
          tokens={tokensInWallet}
          rpcUrl={rpcUrl!}
          multisigPda={params.multisig!}
          vaultIndex={vaultIndex || 0}
        />
      </div>
    </main>
  );
}
