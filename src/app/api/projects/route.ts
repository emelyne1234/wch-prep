import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { log } from "next-axiom";
import db from "@/server/db";
import { projectMembers, projects } from "@/server/db/schema";
import { getServerSession } from "next-auth";
import { options } from "@/auth";

const createProjectSchema = createInsertSchema(projects);

export async function GET(request: NextRequest) {
  try {
    const returnedProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
    return NextResponse.json(returnedProjects, { status: 200 });
  } catch (error) {
    log.error("Failed to get projects", error as Error);
    return NextResponse.json(
      { error: "Failed to get projects" },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  const session = await getServerSession(options);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as z.infer<typeof createProjectSchema>;

    // Convert string dates to Date objects
    const formattedBody: z.infer<typeof createProjectSchema> = {
      ...body,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      createdBy: session.user.id,
    };

    // create project with owner
    const project = await db.insert(projects).values(formattedBody).returning();
    const addProjectMember = await db
      .insert(projectMembers)
      .values({
        projectId: project[0].projectId,
        userId: session.user.id,
        roleTitle: "Project Creator",
        isLeader: true,
        status: "active",
      })
      .returning();

    return NextResponse.json(
      { message: "Project created successfully", data: project },
      { status: 201 }
    );
  } catch (error) {
    log.error("Failed to create project", error as Error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
