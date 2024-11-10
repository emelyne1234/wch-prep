import { NextRequest, NextResponse } from "next/server";
import db from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { HttpStatusCode } from "axios";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const id = resolvedParams.id;
    const existingUser = await db.select().from(users).where(eq(users.id, id));

    if (existingUser.length === 0) {
      return NextResponse.json(
        { message: "user id not found", status: 200 },
        { status: HttpStatusCode.BadRequest }
      );
    }

    return NextResponse.json(
      { data: existingUser[0], message: "user retrieved successfully" },
      { status: HttpStatusCode.Accepted }
    );
  } catch (error) {
    const Error = error as Error;
    return NextResponse.json({ message: Error.message }, { status: 500 });
  }
}
