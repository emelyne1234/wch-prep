import { NextRequest, NextResponse } from "next/server";
import db from "@/server/db";
import { messages } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { HttpStatusCode } from "axios";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";
import { getServerSession } from "next-auth";
import { options } from "@/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { content } = await req.json();
    const projectId = (await params).id;

    const newMessage = await db.insert(messages).values({
      projectId,
      senderId: userId,
      messageText: content,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { data: newMessage, message: "Message created successfully" },
      { status: HttpStatusCode.Created }
    );
  } catch (error) {
    const Error = error as Error;
    return NextResponse.json(
      { message: Error.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const projectId = params.id;
    const projectMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.projectId, projectId));

    return NextResponse.json(
      {
        data: projectMessages,
        message: "Messages retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    const Error = error as Error;
    return NextResponse.json(
      { message: Error.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
