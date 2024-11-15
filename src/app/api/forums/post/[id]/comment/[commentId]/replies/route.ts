import db from "@/server/db";
import { postCommentReplies, forumsPostComments } from "@/server/db/schema";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";
import { HttpStatusCode } from "axios";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ commentId: string }> }) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json(
        { status: HttpStatusCode.Unauthorized, message: "Unauthorized" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { commentId } = await params;
    const { content } = await req.json();

    const existingComment = await db
      .select()
      .from(forumsPostComments)
      .where(eq(forumsPostComments.id, commentId))
      .limit(1);

    if (!existingComment.length) {
      return NextResponse.json(
        { status: HttpStatusCode.NotFound, message: "Comment not found" },
        { status: HttpStatusCode.NotFound }
      );
    }
    await db.insert(postCommentReplies).values({
      commentId,
      userId,
      content,
    });

    return NextResponse.json(
      { status: HttpStatusCode.Ok, message: "Reply added successfully" },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { status: HttpStatusCode.InternalServerError, message: err.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
