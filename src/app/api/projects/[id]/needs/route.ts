import db from "@/server/db";
import { projectNeeds } from "@/server/db/schema";
import { log } from "next-axiom";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { need, roleType } = body;
    console.log("need", need);
    console.log("roleType", roleType);

    const needs = await db.insert(projectNeeds).values({
      projectId: id,
      need,
      roleType,
    });

    return NextResponse.json({
      message: "Need added successfully",
      data: needs,
    });
  } catch (error) {
    log.error("Failed to add need", error as Error);
    return NextResponse.json({ error: "Failed to add need" }, { status: 500 });
  }
}
