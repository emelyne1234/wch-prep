import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import db from "@/server/db";
import { projectMembers } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { options } from "@/auth";
import { log } from "next-axiom";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(options);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  try {
    const existingMember = await db
      .select()
    .from(projectMembers)
    .where(and(eq(projectMembers.projectId, id), eq(projectMembers.userId, userId)));

  if (existingMember.length > 0) {
    return NextResponse.json({ error: "Already a member" }, { status: 400 });
  }

  const newMember = await db.insert(projectMembers).values({
    projectId: id,
    userId: userId,
    roleTitle: "Member",
      status: "active",
      joinedDate: new Date(),
    });

    return NextResponse.json(
      { message: "Joined project successfully", data: newMember },
      { status: 200 }
    );
  } catch (error) {
    log.error("Error joining project", { error: error as Error });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
