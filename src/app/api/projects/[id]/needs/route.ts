import { options } from "@/auth";
import db from "@/server/db";
import { projectNeeds } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Need {
  title: string;
  description: string;
  quantity: number;
  priority: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const needs = await db.query.projectNeeds.findMany({
      where: eq(projectNeeds.projectId, resolvedParams.id),
    });
    return NextResponse.json(needs);
  } catch (e) {
    console.error("Error fetching project needs:", e);
    return NextResponse.json(
      { error: "Failed to fetch project needs" },
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
    const { title, description, quantity, priority } = body;

    if (!title || !description || !quantity || !priority) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newNeed = await db
      .insert(projectNeeds)
      .values({
        projectId: resolvedParams.id,
        need: title,
        roleType: priority,
      })
      .returning();

    return NextResponse.json(newNeed[0], { status: 201 });
  } catch (error) {
    console.error("Error creating project need:", error);
    return NextResponse.json(
      { error: "Failed to create project need" },
      { status: 500 }
    );
  }
}
