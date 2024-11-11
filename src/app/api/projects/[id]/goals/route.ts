import { options } from "@/auth";
import db from "@/server/db";
import { projectGoals } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const goals = await db.query.projectGoals.findMany({
      where: eq(projectGoals.projectId, resolvedParams.id),
    });

    return NextResponse.json(goals);
  } catch (error) {
    console.error("Error fetching project goals:", error);
    return NextResponse.json(
      { error: "Failed to fetch project goals" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { goal } = body;

    if (!goal) {
      return NextResponse.json(
        { error: "Goal text is required" },
        { status: 400 }
      );
    }

    const newGoal = await db
      .insert(projectGoals)
      .values({
        projectId: resolvedParams.id,
        goal: goal,
        // isAchieved defaults to false in schema
      })
      .returning();

    return NextResponse.json(newGoal[0], { status: 201 });
  } catch (error) {
    console.error("Error creating project goal:", error);
    return NextResponse.json(
      { error: "Failed to create project goal" },
      { status: 500 }
    );
  }
}
