import { NextRequest, NextResponse } from "next/server"
import z, { ZodSchema } from "zod"
import { kv } from '@vercel/kv';


const schema = z.object({
  address: z.string(),
})

export const GET = async (req: NextRequest) => {
  const { params, error } = await parseParams(req, schema)

  if (!params) {
    return NextResponse.json({ error: error }, { status: 400 })
  }


  const multisigds = await kv.get("multisigs:" + params.address) 

  const array = multisigds ? (multisigds as string[]) : [] 

  const multisigsWithData = []
  for (let i = 0; i < array.length; i++) {
    const multisig = await kv.get("msdata:" + array[i])
    
    if (multisig) {
      multisigsWithData.push({
        ...multisig,
        address: array[i]
      })
    }
  }


  return NextResponse.json({
    success: true,
    multisigs: multisigsWithData
  })
}

 async function parseParams<T>(
    req: NextRequest,
    schema: ZodSchema<T>
  ): Promise<{ error: string | null; params: T | null }> {
    const params = req.nextUrl.searchParams.keys()
  
    const allparams = Array.from(params).reduce((acc, key) => {
      acc[key] = req.nextUrl.searchParams.get(key)
      return acc
    }, {} as { [key: string]: string | null })
  
    const parsed = schema.safeParse(allparams)
  
    if (!parsed.success) {
      return { error: parsed.error.message, params: null }
    }
  
    return { error: null, params: parsed.data }
  }