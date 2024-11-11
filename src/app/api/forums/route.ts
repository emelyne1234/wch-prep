import { NextResponse, NextRequest } from "next/server";
import db from "@/server/db";
import { HttpStatusCode } from "axios";
import { forums, users } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { status: 404, message: "User not found", data: null },
        { status: HttpStatusCode.NotFound }
      );
    }

    const { title, content } = await req.json();

    await db.insert(forums).values({
      userId: userId,
      title: title,
      content: content,
    });

    return NextResponse.json(
      { status: 200, message: "Forum posted successfully", data: null },
      { status: HttpStatusCode.Accepted }
    );
  } catch (error: unknown) {
    const Error = error as Error;
    return NextResponse.json({
      status: 500,
      data: null,
      message: Error.message,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "3", 10);
    const offset = (page - 1) * pageSize;

    const totalRecordsResult = await db
      .select({
        count: sql`COUNT(*)`.as("count"),
      })
      .from(forums);
    const totalRecords = Number(totalRecordsResult[0]?.count) || 0;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const data = await db
      .select({
        id: forums.id,
        title: forums.title,
        content: forums.content,
        userId: forums.userId,
        createdAt: forums.createdAt,
      })
      .from(forums)
      .offset(offset)
      .limit(pageSize);

    return NextResponse.json({
      status: 200,
      data: data,
      pagination: {
        page,
        pageSize,
        totalRecords,
        totalPages,
      },
      message: "Fetched forums successfully",
    });
  } catch (error: unknown) {
    const Error = error as Error;
    return NextResponse.json({
      status: 500,
      data: null,
      message: Error.message,
    });
  }
}
