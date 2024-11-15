import db from "@/server/db";
import {  posts, users } from "@/server/db/schema";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";
import { HttpStatusCode } from "axios";
import { desc, eq } from "drizzle-orm";
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
      { status: HttpStatusCode.Ok, data: null, message: "Post created successfully" },
      { status: HttpStatusCode.Ok }
    );

  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { status: HttpStatusCode.InternalServerError, message: err.message, data: null },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function GET(req: NextRequest,   { params }: { params: Promise<{ id: string }> }) {
  try {
    
    const { id } = await params;


    if (!id) {
      return NextResponse.json(
        { status: HttpStatusCode.BadRequest, message: "Forum ID is required", data: null },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const allPosts = await db.select({
      postId: posts.id,
      content: posts.content,
      createdAt: posts.createdAt,
      username: users.username,
      profileImage: users.profileImage,
    })
      .from(posts)
      .leftJoin(users, eq(posts.userId, users.id))
      .where(eq(posts.forumId, id))
      .orderBy(desc(posts.createdAt));;

    return NextResponse.json(
      { status: HttpStatusCode.Ok, data: allPosts, message: "Posts retrieved successfully" },
      { status: HttpStatusCode.Ok }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { status: HttpStatusCode.InternalServerError, message: error, data: null },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

