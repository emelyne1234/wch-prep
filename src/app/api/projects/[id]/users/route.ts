import db from "@/server/db";
import { projectMembers, projects } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { log } from "next-axiom";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const projectMemberData = await db.query.projectMembers.findMany({
      where: eq(projectMembers.projectId, id),
    });

    if (!projectMemberData) {
      return NextResponse.json(
        {
          message: "project members not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Project members fetched successfully",
      data: projectMemberData,
    });
  } catch (error) {
    log.error("Failed to get project members", error as Error);
    return NextResponse.json(
      { error: "Failed to get project members" },
      { status: 500 }
    );
  }
}
