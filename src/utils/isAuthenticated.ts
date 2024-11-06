import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function isAuthenticated(
  req: NextRequest,
  res: NextResponse,
) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return null;
}
