import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { log } from "next-axiom";
import db from "@/server/db";
import { projects } from "@/server/db/schema";
import { getServerSession } from "next-auth";
import { options } from "@/auth";

const createProjectSchema = createInsertSchema(projects);

export async function GET(request: NextRequest) {
  try {
    const returnedProjects = await db.select().from(projects);
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
    
    const project = await db.insert(projects).values(body);

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
