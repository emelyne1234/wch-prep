import db from "@/server/db";
import { forumMembers, forums } from "@/server/db/schema";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json(
        { status: 401, data: null, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userForums = await db
      .select({
        forumId: forums.id,
        forumName: forums.name,
        joinedAt: forumMembers.joined_at,
      })
      .from(forumMembers)
      .innerJoin(forums, eq(forumMembers.forumId, forums.id))
      .where(eq(forumMembers.userId, userId));


    return NextResponse.json(
      { status: 200, data: userForums, message: "User forums retrieved successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { status: 500, message: err.message, data: null },
      { status: 500 }
    );
  }
}
