import db from "@/server/db";
import { forumPostLikes } from "@/server/db/schema";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";
import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { eq, or } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json(
        { status: HttpStatusCode.Unauthorized, data: null, message: "User not authenticated" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { postId } = await req.json();

    const existingLike = await db.select().from(forumPostLikes).where(or(

        eq(forumPostLikes.userId, userId),
        eq(forumPostLikes.postId, postId)
    )
    );

    if (existingLike.length > 0) {
      return NextResponse.json(
        { status: HttpStatusCode.BadRequest, data: null, message: "User already liked this post" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    await db.insert(forumPostLikes).values({
      postId,
      userId,
    });

    return NextResponse.json(
      { status: HttpStatusCode.Created, data: null, message: "Post liked successfully" },
      { status: HttpStatusCode.Created }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { status: HttpStatusCode.InternalServerError, message: "Error liking post", data: null },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
