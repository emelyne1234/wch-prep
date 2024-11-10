import { NextRequest, NextResponse } from "next/server";
import db from "@/server/db";
import { articlesComments, articles } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { HttpStatusCode } from "axios";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";

// Update type definition to use Promise
type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const existingArticlesComments = await db
      .select()
      .from(articlesComments)
      .where(eq(articlesComments.id, id));

    if (existingArticlesComments.length === 0) {
      return NextResponse.json(
        { message: "Comment not found", status: 200 },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const commentData = existingArticlesComments[0];

    return NextResponse.json({
      status: 200,
      message: "Comment retrieved successfully",
      data: {
        id: commentData.id,
        comment: commentData.comment,
        userId: commentData.userId,
        createdAt: commentData.createdAt,
      },
    });
  } catch (error) {
    const Error = error as Error;
    return NextResponse.json({ message: Error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const resolvedParams = await params;
  const articleId = resolvedParams.id;

  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { comment } = await req.json();

    const existingArticles = await db
      .select()
      .from(articles)
      .where(eq(articles.id, articleId));

    if (existingArticles.length === 0) {
      return NextResponse.json(
        { message: "Articles not found", status: 200 },
        { status: HttpStatusCode.BadRequest }
      );
    }

    await db.insert(articlesComments).values({
      articlesId: articleId,
      userId: userId,
      comment: comment,
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

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const existingComment = await db
      .select()
      .from(articlesComments)
      .where(eq(articlesComments.id, id));

    if (existingComment.length === 0) {
      return NextResponse.json(
        { message: "Comment not found", status: 200 },
        { status: HttpStatusCode.BadRequest }
      );
    }
    await db.delete(articlesComments).where(eq(articlesComments.id, id));

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

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const body = await req.json();

    const existingForumComments = await db
      .select()
      .from(articlesComments)
      .where(eq(articlesComments.id, id));

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
      .update(articlesComments)
      .set(updateData)
      .where(eq(articlesComments.id, id));

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
