import ConnectWallet from "@/components/ConnectWalletButton";
import ListMultisigs from "@/components/ListMultisigs";
import { clusterApiUrl } from "@solana/web3.js";
import { headers } from "next/headers";
import Link from "next/link";

export default function List() {

    const rpcUrl = headers().get("x-rpc-url");
    
  return (
    <>
      <div className="container mx-auto p-4">
       
        <ListMultisigs rpcUrl={rpcUrl  || (process.env.NEXT_PUBLIC_RPC as string)} />
      </div>
    </>
  );
}
