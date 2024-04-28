import { NextRequest, NextResponse } from "next/server";
import z, { ZodSchema } from "zod";
import { kv } from "@vercel/kv";
import * as multisig from "@/squads/src";
import { Connection, PublicKey } from "@solana/web3.js";

const schema = z.object({
  multisigpda: z.string(),
});

export const GET = async (req: NextRequest) => {
  const { params, error } = await parseParams(req, schema);

  if (!params) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  const connection = new Connection(process.env.NEXT_PUBLIC_RPC as string, {
    commitment: "processed",
  });

  const multisigAccoint = await multisig.accounts.Multisig.fromAccountAddress(
    connection,
    new PublicKey(params.multisigpda)
  );

  multisigAccoint.members.forEach(async (member) => {
    const address = member.key.toBase58();

    // update the multisig list of each of these members

    const memberMultisigs = await kv.get("multisigs:" + address);
    const ar = memberMultisigs ? (memberMultisigs as string[]) : [];

    // add it if it doesn't exist

    if (!ar.includes(params.multisigpda)) {
      await kv.set("multisigs:" + address, [...ar, params.multisigpda]);
    }
  });

  return NextResponse.json({
    success: true,
    multisig: multisigAccoint,
  });
};

async function parseParams<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<{ error: string | null; params: T | null }> {
  const params = req.nextUrl.searchParams.keys();

  const allparams = Array.from(params).reduce((acc, key) => {
    acc[key] = req.nextUrl.searchParams.get(key);
    return acc;
  }, {} as { [key: string]: string | null });

  const parsed = schema.safeParse(allparams);

  if (!parsed.success) {
    return { error: parsed.error.message, params: null };
  }

  return { error: null, params: parsed.data };
}
