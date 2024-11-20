import db from "@/server/db";
import {
  projectGoals,
  projectMembers,
  projectNeeds,
  projects,
  users,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { log } from "next-axiom";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project =
      (await db.query.projects.findFirst({
        where: eq(projects.projectId, id),
      })) || [];

    const members =
      (await db
        .select({
          memberId: projectMembers.id,
          projectId: projectMembers.projectId,
          userId: projectMembers.userId,
          role: projectMembers.roleTitle,
          userName: users.username,
          userImage: users.profileImage,
        })
        .from(projectMembers)
        .leftJoin(users, eq(projectMembers.userId, users.id))
        .where(eq(projectMembers.projectId, id))) || [];

    const goals =
      (await db
        .select()
        .from(projectGoals)
        .where(eq(projectGoals.projectId, id))) || [];

    const needs =
      (await db
        .select()
        .from(projectNeeds)
        .where(eq(projectNeeds.projectId, id))) || [];
    return NextResponse.json({
      message: "Project fetched successfully",
      data: { project, members, goals, needs },
    });
  } catch (error) {
    log.error("Failed to get project details", error as Error);
    return NextResponse.json(
      { error: "Failed to get project details" },
      { status: 500 }
    );
  }
}

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const body = await request.json();
//     // const updatedProject = await db.query.projects.update({
//     //   where: eq(projects.projectId, id),
//     //   set: body,
//     // });

//     return NextResponse.json({
//       message: "Project updated successfully",
//       data: updatedProject,
//     });
//   } catch (error) {
//     log.error("Failed to update project", error as Error);
//     return NextResponse.json(
//       { error: "Failed to update project" },
//       { status: 500 }
//     );
//   }
// }
