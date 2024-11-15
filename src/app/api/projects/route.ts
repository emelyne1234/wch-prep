import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { log } from "next-axiom";
import db from "@/server/db";
import { projects } from "@/server/db/schema";
import { getServerSession } from "next-auth";

const createProjectSchema = createInsertSchema(projects);
export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: z.infer<typeof createProjectSchema> = await request.json();
    const project = await db.insert(projects).values(body);

    return NextResponse.json(
      { message: "Project created successfully", project },
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
