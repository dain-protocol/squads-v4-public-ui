import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodSchema } from "zod";

const schema = z.object({
  multisigPda: z.string(),
  name: z.string(),
  creator: z.string(),
});

export const POST = async (req: NextRequest) => {
  const { body, error } = await parseBody(req, schema);

  if (!body) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  // get the multsig from the KV store

  const multisig = await kv.get("msdata:" + body.multisigPda);

  if (multisig) {
    return NextResponse.json({
      error: "Multisig already exists",
    });
  }


  // store the multisig in the KV store

  await kv.set("msdata:" + body.multisigPda, {
    name: body.name,
    creator: body.creator,
  });

  // add multisig to the list of multisigs for the creator

  const creatorMultisigs = await kv.get("multisigs:" + body.creator);

  await kv.set("multisigs:" + body.creator, [
    ...((creatorMultisigs || []) as string[]),
    body.multisigPda,
  ]);
  return NextResponse.json({
    success: true,
  });
};

async function parseBody<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<{ error: string | null; body: T | null }> {
  const body = await req.json();
  //console.log("REQUEST:", req.url, body);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return { error: parsed.error.message, body: null };
  }
  return { error: null, body: parsed.data };
}
