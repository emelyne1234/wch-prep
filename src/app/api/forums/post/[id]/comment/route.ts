import { HttpStatusCode } from "axios";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";
import db from "@/server/db";
import { forumsPostComments } from "@/server/db/schema";
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
      const { content } = await req.json();
  
      // Insert a new comment for the post
      await db.insert(forumsPostComments).values({
        postId,
        userId,
        content,
      });
  
      return NextResponse.json(
        { status: HttpStatusCode.Ok, message: "Comment added successfully" },
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
  