import { NextRequest, NextResponse } from "next/server";
import db from "@/server/db";
import { forums, forumsPostComments } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { HttpStatusCode } from "axios";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { id } = await params;

    const existingForumComments = await db
      .select()
      .from(forumsPostComments)
      .where(eq(forumsPostComments.id, id));

    if (existingForumComments.length === 0) {
      return NextResponse.json(
        { message: "Comment not found", status: 200 },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const commentData = existingForumComments[0];

    return NextResponse.json({
      status: 200,
      message: "Comment retrieved successfully",
      data: {
        id: commentData.id,
        comment: commentData.content
      },
    });
  } catch (error) {
    const Error = error as Error;
    return NextResponse.json({ message: Error.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { id: postId } = await params;

    const { content } = await req.json();


    await db.insert(forumsPostComments).values({
      postId,
      userId,
      content,
    });

    return NextResponse.json({
      status: 200,
      message: "Comment saved successfully",
      data: null,
    });
  } catch (error) {
    const Error = error as Error;
    return NextResponse.json({ message: Error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { id } = await params;

    const existingComment = await db
      .select()
      .from(forumsPostComments)
      .where(eq(forumsPostComments.id, id));

    if (existingComment.length === 0) {
      return NextResponse.json(
        { message: "Comment not found", status: 200 },
        { status: HttpStatusCode.BadRequest }
      );
    }
    await db.delete(forumsPostComments).where(eq(forumsPostComments.id, id));

    return NextResponse.json({
      status: 200,
      message: "comments deleted successfully",
      data: null,
    });
  } catch (error) {
    const Error = error as Error;
    return NextResponse.json({ message: Error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { id } = await params;

    const body = await req.json();

    const existingForumComments = await db
      .select()
      .from(forumsPostComments)
      .where(eq(forumsPostComments.id, id));

    if (existingForumComments.length === 0) {
      return NextResponse.json(
        { message: "Comment not found", status: 200 },
        { status: HttpStatusCode.BadRequest }
      );
    }
    const updateData = {
      ...body,
      updated_at: new Date(),
      updated_by: userId!,
    };

    await db
      .update(forumsPostComments)
      .set(updateData)
      .where(eq(forumsPostComments.id, id));

    return NextResponse.json({
      status: 200,
      message: "Comments updated successfully",
      data: updateData,
    });
  } catch (error) {
    const Error = error as Error;
    return NextResponse.json({ message: Error.message }, { status: 500 });
  }
}
