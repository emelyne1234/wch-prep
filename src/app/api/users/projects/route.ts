import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/auth";
import db from "@/server/db";
import {} from "drizzle-orm";
import { projectMembers, projects } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { log } from "next-axiom";
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(options);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch project IDs for the user
    const projectIds = await db
      .select({ projectId: projectMembers.projectId })
      .from(projectMembers)
      .where(eq(projectMembers.userId, session.user.id));

    // Loop through project IDs to fetch projects
    const projectsdata = await Promise.all(
      projectIds.map(async (id) => {
        return await db
          .select()
          .from(projects)
          .where(eq(projects.projectId, id.projectId));
      })
    );

    // Flatten the array of projects
    const flattenedProjects = projectsdata.flat();

    console.log("projects:", flattenedProjects);

    if (!flattenedProjects || flattenedProjects.length === 0) {
      return NextResponse.json(
        { message: "No projects found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Projects fetched successfully", data: flattenedProjects },
      { status: 200 }
    );
  } catch (error) {
    log.error("Failed to get projects", error as Error);
    return NextResponse.json(
      { error: "Failed to get projects" },
      { status: 500 }
    );
  }
}
