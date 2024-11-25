import { NextResponse, NextRequest } from "next/server";
import db from "@/server/db";
import { HttpStatusCode } from "axios";
import { desc } from "drizzle-orm";
import { resources } from "@/server/db/schema";
import { sql } from "drizzle-orm";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";
import { log } from "next-axiom";

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
      .from(resources);
    const totalRecords = Number(totalRecordsResult[0]?.count) || 0;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const data = await db
      .select({
        id: resources.id,
        title: resources.title,
        contentUrl: resources.contentUrl,
        type: resources.type,
        category: resources.category,
        createdAt: resources.createdAt,
        description: resources.description,
      })
      .from(resources)
      .offset(offset)
      .limit(pageSize)
      .orderBy(desc(resources.createdAt));

    return NextResponse.json({
      status: 200,
      data: data,
      pagination: {
        page,
        pageSize,
        totalRecords,
        totalPages,
      },
      message: "Fetched resources successfully",
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

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    // TODO: Validate the request body
    const body = await req.json();
    const { title, description, contentUrl, type, category } = body;

    await db.insert(resources).values({
      title: title,
      description: description,
      contentUrl: contentUrl,
      type: type,
      category: category,
    });

    return NextResponse.json(
      { status: 200, message: "resources posted successfully", data: null },
      { status: HttpStatusCode.Accepted }
    );
  } catch (error: unknown) {
    log.error("Failed to create resources", error as Error);
    return NextResponse.json({
      status: 500,
      data: null,
      message: (error as Error).message,
    });
  }
}
