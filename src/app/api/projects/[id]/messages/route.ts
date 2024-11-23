import { options } from "@/auth";
import db from "@/server/db";
import { messages, projectGoals, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { log } from "next-axiom";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await db
      .select({
        messageId: messages.id,
        messageText: messages.messageText,
        senderId: messages.senderId,
        senderName: users.username,
        image: users.profileImage,
        createdAt: messages.createdAt,
      })
      .from(messages)
      .innerJoin(users, eq(messages.senderId, users.id))
      .where(eq(messages.projectId, id));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    log.error("Failed to fetch messages", error as Error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const { messageText } = body;

    const result = await db.insert(messages).values({
      projectId: id,
      senderId: session.user.id,
      messageText,
    });

    return NextResponse.json({
      message: "Message sent",
      data: result,
    });
  } catch (error) {
    log.error("Failed to add message", error as Error);
    return NextResponse.json(
      { error: "Failed to add message" },
      { status: 500 }
    );
  }
}
