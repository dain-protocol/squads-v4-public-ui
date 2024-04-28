"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import ConnectWallet from "./ConnectWalletButton";
import { Suspense } from "react";
import useSWR from "swr";
import Link from "next/link";
import CreateMultisig from "./CreateMultisig";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { buttonVariants } from "./ui/button";

export default function ListMultisigs({ rpcUrl }: { rpcUrl: string }) {
  const { publicKey, connected } = useWallet();

  if (!publicKey || !connected) {
    return (
      <>
        <div className="flex flex-col space-y-4 items-center mt-16">
          <ConnectWallet />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">My Multisigs</h1>
        <div className="flex flex-row space-x-4">
          <CreateMultisig rpcUrl={rpcUrl} />
          <ConnectWallet />
        </div>
      </div>

      <div className="flex flex-col space-y-4 items-center mt-16">
        <Multisigs address={publicKey.toBase58()} />
      </div>
    </>
  );
}

function Multisigs({ address }: { address: string }) {
  const { data: multisigs, isLoading } = useSWR(
    "/api/multisigs?address=" + address,
    async (url: string) => {
      const response = await fetch(url);
      return response.json();
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const list = multisigs.multisigs;

  if (list.length === 0) {
    return (
      <div className="flex flex-col space-y-4 items-center mt-16">
        <h1 className="text-2xl font-bold">No Multisigs Found</h1>
        <p className="text-lg">Create a multisig to get started</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1000px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((multisig: any) => (
            <TableRow key={multisig.address}>
              <TableCell>{multisig.name}</TableCell>

              <TableCell>{multisig.address}</TableCell>
              <TableCell>
                <Link
                  href={`/${multisig.address}`}
                  className={buttonVariants()}
                >
                  Manage
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
