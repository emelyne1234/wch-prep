import db from "@/server/db";
import { projectMembers, projectNeeds, projects } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(options);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if project exists
    const project = await db.query.projects.findFirst({
      where: eq(projects.projectId, resolvedParams.id),
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check if user is already a member
    const existingMember = await db.query.projectMembers.findFirst({
      where: and(
        eq(projectMembers.projectId, resolvedParams.id),
        eq(projectMembers.userId, session.user.id)
      ),
    });

    if (existingMember) {
      return NextResponse.json(
        { error: "Already a member of this project" },
        { status: 400 }
      );
    }

    // Create project member entry
    const newMember = await db.insert(projectMembers).values({
      projectId: resolvedParams.id,
      userId: session.user.id,
      roleTitle: "contributor",
      status: "pending",
    });

    return NextResponse.json({
      message: "Successfully requested to join project",
      member: newMember,
    });
  } catch (error) {
    console.error("Error joining project:", error);
    return NextResponse.json(
      { error: "Failed to join project" },
      { status: 500 }
    );
  }
}
