import { NextRequest, NextResponse } from "next/server";
import  db from "@/server/db";
import { forums, articles } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { HttpStatusCode } from "axios";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const existingArticles = await db
      .select()
      .from(articles)
      .where(eq(articles.id, id));

    if (existingArticles.length === 0) {
      return NextResponse.json(
        { message: "Articles not found", status: 200 },
        { status: HttpStatusCode.BadRequest }
      );
    }
    const updateData = {
      ...body,
      updated_at: new Date(),
      updated_by: userId!,
    };

    await db.update(articles).set(updateData).where(eq(articles.id, id));

    return NextResponse.json({
      status: 200,
      message: "articles updated successfully",
      data: updateData,
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

    const existingArticles = await db
      .select()
      .from(articles)
      .where(eq(articles.id, id));

    if (existingArticles.length === 0) {
      return NextResponse.json(
        { message: "articles not found", status: 200 },
        { status: HttpStatusCode.BadRequest }
      );
    }
    await db.delete(articles).where(eq(articles.id, id));

    return NextResponse.json({
      status: 200,
      message: "Articles deleted successfully",
      data: null,
    });
  } catch (error) {
    const Error = error as Error;
    return NextResponse.json({ message: Error.message }, { status: 500 });
  }
}
