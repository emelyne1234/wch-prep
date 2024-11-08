import { NextResponse, NextRequest } from "next/server";
import { db } from "@/server/db";
import { HttpStatusCode } from "axios";
import { animals } from "@/server/db/schema";
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

    const { name,species, description, habitat, status } = await req.json();

    await db.insert(animals).values({
      name: name,
      species: species,
      description: description,
      habitat: habitat,
      status: status
    });

    return NextResponse.json(
      { status: 200, message: "animals saved successfully", data: null },
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
      .from(animals);
      const totalRecords =  Number(totalRecordsResult[0]?.count) || 0;
      const totalPages = Math.ceil(totalRecords / pageSize);
  
      const data = await db
        .select({
          id: animals.id,
          species: animals.species,
          description: animals.description,
          habitat: animals.habitat,
          status: animals.status,
        })
        .from(animals)
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
        message: "Fetched animals successfully",
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