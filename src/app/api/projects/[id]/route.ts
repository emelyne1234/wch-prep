import db from "@/server/db";
import { projects } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { options } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const resolvedParams = await params;
    const project = await db.query.projects.findFirst({
      where: eq(projects.projectId, resolvedParams.id),
      with: {
        projectMembers: true,
        projectNeeds: true,
        projectGoals: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
