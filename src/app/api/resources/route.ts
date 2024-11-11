import { NextResponse, NextRequest } from "next/server";
import db from "@/server/db";
import { HttpStatusCode } from "axios";
import { resources } from "@/server/db/schema";
import { sql } from "drizzle-orm";
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

    const { title, description, content_url, type } = await req.json();

    await db.insert(resources).values({
      title: title,
      description: description,
      contentUrl: content_url,
      type: type,
    });

    return NextResponse.json(
      { status: 200, message: "resources posted successfully", data: null },
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
      .from(resources);
    const totalRecords = Number(totalRecordsResult[0]?.count) || 0;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const data = await db
      .select({
        id: resources.id,
        title: resources.title,
        contentUrl: resources.contentUrl,
        type: resources.type,
      })
      .from(resources)
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
