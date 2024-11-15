import { and, eq } from "drizzle-orm";

import { NextRequest, NextResponse } from "next/server";

import { getUserIdFromSession } from "@/utils/getUserIdFromSession";

import { HttpStatusCode } from "axios";
import db from "@/server/db";
import { forumPostLikes } from "@/server/db/schema";
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const userId = await getUserIdFromSession();
      if (!userId) {
        return NextResponse.json(
          { status: HttpStatusCode.Unauthorized, message: "Unauthorized" },
          { status: HttpStatusCode.Unauthorized }
        );
      }
  
      const { id: postId } = await params;
  
      const existingLike = await db
        .select()
        .from(forumPostLikes)
        .where(and(eq(forumPostLikes.postId, postId), eq(forumPostLikes.userId, userId)))
        .limit(1);
  
      if (existingLike.length > 0) {
        await db
          .delete(forumPostLikes)
          .where(and(eq(forumPostLikes.postId, postId), eq(forumPostLikes.userId, userId)));
  
        return NextResponse.json(
          { status: HttpStatusCode.Ok, message: "Post unliked successfully" },
          { status: HttpStatusCode.Ok }
        );
      } else {
        await db.insert(forumPostLikes).values({
          postId,
          userId,
        });
  
        return NextResponse.json(
          { status: HttpStatusCode.Ok, message: "Post liked successfully" },
          { status: HttpStatusCode.Ok }
        );
      }
    } catch (error) {
      const err = error as Error;
      return NextResponse.json(
        { status: HttpStatusCode.InternalServerError, message: err.message },
        { status: HttpStatusCode.InternalServerError }
      );
    }
  }
  