import { NextResponse, NextRequest } from "next/server";
import { db } from "@/server/db";
import { HttpStatusCode } from "axios";
import { articles,users } from "@/server/db/schema";
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
    const { title, content, type } = await req.json();

    await db.insert(articles).values({
      author_id: userId,
      title: title,
      content: content,
      type: type
    });

    return NextResponse.json(
      { status: 200, message: "Articles posted successfully", data: null },
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
      .from(articles);
      const totalRecords =  Number(totalRecordsResult[0]?.count) || 0;
      const totalPages = Math.ceil(totalRecords / pageSize);
  
      const data = await db
        .select({
          id: articles.id,
          title: articles.title,
          content: articles.content,
          author_id: articles.author_id,
          created_at: articles.created_at,
        })
        .from(articles)
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
        message: "Fetched articles successfully",
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