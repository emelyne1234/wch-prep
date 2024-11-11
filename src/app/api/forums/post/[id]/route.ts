import db from "@/server/db";
import { posts } from "@/server/db/schema";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest,   { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json(
        { status: HttpStatusCode.Unauthorized, data: null, message: "Unauthorized" },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { id } = await params;

    const { content  } = await req.json();

    const newPost = await db.insert(posts).values({
      forumId: id,
      userId,
      content: content,
    });

    return NextResponse.json(
      { status: HttpStatusCode.Created, data: newPost, message: "Post created successfully" },
      { status: HttpStatusCode.Created }
    );

  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { status: HttpStatusCode.InternalServerError, message: "Error occurred", data: null },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
