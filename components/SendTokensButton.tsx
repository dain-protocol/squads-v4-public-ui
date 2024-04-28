"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { use, useEffect, useState } from "react";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import * as multisig from "@/squads/src";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionMessage,
  clusterApiUrl,
} from "@solana/web3.js";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SendTokensProps = {
  tokenAccount: string;
  mint: string;
  decimals: number;
  rpcUrl: string;
  multisigPda: string;
  vaultIndex: number;
};

const SendTokens = ({
  tokenAccount,
  mint,
  decimals,
  rpcUrl,
  multisigPda,
  vaultIndex,
}: SendTokensProps) => {
  const wallet = useWallet();
  const walletModal = useWalletModal();
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const router = useRouter();

  const transfer = async () => {
    if (!wallet.publicKey) {
      walletModal.setVisible(true);
      return;
    }
    const recipientATA = getAssociatedTokenAddressSync(
      new PublicKey(mint),
      new PublicKey(recipient),
      true
    );

    const vaultAddress = multisig
      .getVaultPda({
        index: vaultIndex,
        multisigPda: new PublicKey(multisigPda),
      })[0]
      .toBase58();

    const createRecipientATAInstruction =
      createAssociatedTokenAccountIdempotentInstruction(
        new PublicKey(vaultAddress),
        recipientATA,
        new PublicKey(recipient),
        new PublicKey(mint)
      );

    const transferInstruction = createTransferCheckedInstruction(
      new PublicKey(tokenAccount),
      new PublicKey(mint),
      recipientATA,
      new PublicKey(vaultAddress),
      amount * 10 ** decimals,
      decimals
    );

    const connection = new Connection(rpcUrl || (process.env.NEXT_PUBLIC_RPC as string), {
      commitment: "processed",
    });

    const multisigInfo = await multisig.accounts.Multisig.fromAccountAddress(
      connection,
      new PublicKey(multisigPda)
    );

    const blockhash = (await connection.getLatestBlockhash()).blockhash;

    const transferMessage = new TransactionMessage({
      instructions: [createRecipientATAInstruction, transferInstruction],
      payerKey: wallet.publicKey,
      recentBlockhash: blockhash,
    });

    const transactionIndex = Number(multisigInfo.transactionIndex) + 1;
    const transactionIndexBN = BigInt(transactionIndex);

    const multisigTransaction = multisig.transactions.vaultTransactionCreate({
      multisigPda: new PublicKey(multisigPda),
      blockhash,
      creator: wallet.publicKey,
      ephemeralSigners: 0,
      feePayer: wallet.publicKey,
      transactionMessage: transferMessage,
      transactionIndex: transactionIndexBN,
      addressLookupTableAccounts: [],
      rentPayer: wallet.publicKey,
      vaultIndex: vaultIndex,
    });
    const signature = await wallet.sendTransaction(
      multisigTransaction,
      connection,
      {
        skipPreflight: true,
      }
    );
    console.log("Transaction signature", signature);
    toast.info("Transaction submitted.");
    await connection.confirmTransaction(signature, "processed");
    toast.success("Proposal creation successful.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Send Tokens</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer tokens</DialogTitle>
          <DialogDescription>
            Create a proposal to transfer tokens to another address.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Recipient"
          type="text"
          onChange={(e) => setRecipient(e.target.value)}
        />
        {isValidPublicKey(recipient) ? null : (
          <p className="text-xs">Invalid recipient address</p>
        )}
        <Input
          placeholder="Amount"
          type="number"
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <Button onClick={transfer} disabled={!isValidPublicKey(recipient)}>
          Transfer
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SendTokens;

const isValidPublicKey = (value: string) => {
  try {
    new PublicKey(value);
    return true;
  } catch (e) {
    return false;
  }
};
