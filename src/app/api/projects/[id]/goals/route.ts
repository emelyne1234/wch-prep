import db from "@/server/db";
import { projectGoals } from "@/server/db/schema";
import { log } from "next-axiom";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { goal } = body;

    const result = await db.insert(projectGoals).values({
      projectId: id,
      goal,
    });

    return NextResponse.json({
      message: "Goal added successfully",
      data: result,
    });
  } catch (error) {
    log.error("Failed to add goal", error as Error);
    return NextResponse.json({ error: "Failed to add goal" }, { status: 500 });
  }
}
