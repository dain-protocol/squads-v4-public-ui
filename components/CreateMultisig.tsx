"use client";
import {
  ComputeBudgetInstruction,
  ComputeBudgetProgram,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { Button } from "./ui/button";
import * as multisig from "@/squads/src";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dialog, DialogDescription, DialogHeader } from "./ui/dialog";
import { DialogTrigger } from "./ui/dialog";
import { DialogContent, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import ConnectWallet from "./ConnectWalletButton";

export default function CreateMultisig({ rpcUrl }: { rpcUrl: string }) {
  const { publicKey } = useWallet();

  return (
    <>
      <Dialog>
        <DialogTrigger disabled={!publicKey}>
          <Button disabled={!publicKey} className="mr-2">
            Create Multisig
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new multisig</DialogTitle>
            <DialogDescription>
              Create a new multisig wallet by entering a name.
            </DialogDescription>
          </DialogHeader>

          {!publicKey ? <ConnectWallet /> : <Create rpcUrl={rpcUrl} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Create({ rpcUrl }: { rpcUrl: string }) {
  const { publicKey: creator, wallet, signTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  async function createMultisig() {
    console.log("RPC URL", rpcUrl);
    console.log("Creator", creator);
    setLoading(true);
    try {
      if (!creator) {
        setLoading(false);
        return alert("Please connect your wallet");
      }
      const createKey = Keypair.generate();

      const [multisigPDA] = multisig.getMultisigPda({
        createKey: createKey.publicKey,
      });
      console.log(multisigPDA);
      const [vaultPda] = multisig.getVaultPda({
        multisigPda: multisigPDA,
        index: 0,
      });

      const connection = new Connection(
        rpcUrl || (process.env.NEXT_PUBLIC_RPC as string),
        {
          commitment: "confirmed",
        }
      );

      const programConfigPda = multisig.getProgramConfigPda({})[0];

      const programConfig =
        await multisig.accounts.ProgramConfig.fromAccountAddress(
          connection,
          programConfigPda
        );

      const configTreasury = programConfig.treasury;

      const tx = multisig.transactions.multisigCreateV2({
        blockhash: (await connection.getLatestBlockhash()).blockhash,
        treasury: configTreasury,
        createKey: createKey.publicKey,
        creator: creator,
        multisigPda: multisigPDA,
        configAuthority: null,
        timeLock: 0,
        threshold: 1,
        rentCollector: null,
        members: [
          {
            key: creator,
            permissions: multisig.types.Permissions.all(),
          },
        ],
      });

      if (!wallet || !signTransaction) {
        return alert("Please connect your wallet");
      }
      const signedTx = await signTransaction(tx);
      signedTx.sign([createKey]);
      const signature = await connection.sendRawTransaction(
        signedTx.serialize()
      );

      console.log("Transaction signature", signature);

      toast.loading("Multisig pending confirmation");


      await fetch("/api/createMultisig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature,
          name,
          multisigPda: multisigPDA.toBase58(),
          creator: creator.toBase58(),
        }),
      });

      toast.success("Multisig created");
      setLoading(false);

      location.href = "/" + multisigPDA.toBase58();
    } catch (error: any) {
      console.error(error);
      toast.error("Error creating multisig: " + error.message);
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <>
      <p className="text-gray-500 text-sm">Enter a name for your multisig</p>
      <Input
        type="text"
        placeholder="Multisig Name"
        className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:text-sm mt-2"
        onChange={(e) => setName(e.target.value)}
      />

      <Button
        onClick={() => {
          createMultisig();
        }}
        disabled={!name || loading}
        className="mt-4"
      >
        {loading ? "Creating..." : "Create Multisig"}
      </Button>
    </>
  );
}
