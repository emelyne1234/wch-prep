import db from "@/server/db";
import { forumMembers } from "@/server/db/schema";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";
import { HttpStatusCode } from "axios";
import { eq, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest ) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json(
        { status: HttpStatusCode.Unauthorized, data: null, message: "Unauthorized" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { forumId } = await req.json();

    const existingMember = await db
      .select()
      .from(forumMembers)
      .where(
        or(
          eq(forumMembers.userId, userId),
          eq(forumMembers.forumId, forumId)
        )
      );

    if (existingMember.length > 0) {
      return NextResponse.json(
        { status: HttpStatusCode.BadRequest, data: null, message: "Already a forum member" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    await db
      .insert(forumMembers)
      .values({
        userId: userId,  
        forumId: forumId,  
        joined_at: new Date(),
      });

    return NextResponse.json(
      { status: HttpStatusCode.Ok, data: null, message: "Joined Forum successfully" },
      { status: HttpStatusCode.Ok }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { status: HttpStatusCode.InternalServerError, message: "Error occurred", data: null },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
