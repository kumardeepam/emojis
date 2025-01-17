import { Response } from "@/server/utils"
import { SignJWT } from "jose"
import { nanoid } from "nanoid"
import { type NextRequest } from "next/server"

export const runtime = "edge"
export const revalidate = 0

export async function GET(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1"
  const token = await new SignJWT({ ip })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(new TextEncoder().encode(process.env.API_SECRET ?? ""))

  return Response.success({ body: { token } })
}
