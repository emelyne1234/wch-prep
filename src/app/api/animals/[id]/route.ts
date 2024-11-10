import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { animals } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { HttpStatusCode } from "axios";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: HttpStatusCode.Unauthorized, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { id } = context.params;
    if (!id) {
      return NextResponse.json(
        { message: "Missing animal ID", status: HttpStatusCode.BadRequest },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const body = await req.json();

    const existingAnimals = await db.select().from(animals).where(eq(animals.id, id));
    if (existingAnimals.length === 0) {
      return NextResponse.json(
        { message: "Animal not found", status: HttpStatusCode.NotFound },
        { status: HttpStatusCode.NotFound }
      );
    }

    const updateData = {
      ...body,
      updated_at: new Date(),
      updated_by: userId,
    };

    await db.update(animals).set(updateData).where(eq(animals.id, id));

    return NextResponse.json(
      { status: HttpStatusCode.Accepted, message: "Animal updated successfully", data: updateData },
      { status: HttpStatusCode.Accepted }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { message: err.message, status: HttpStatusCode.InternalServerError },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { status: HttpStatusCode.Unauthorized, message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const { id } = context.params;
    if (!id) {
      return NextResponse.json(
        { message: "Missing animal ID", status: HttpStatusCode.BadRequest },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const existingAnimals = await db.select().from(animals).where(eq(animals.id, id));
    if (existingAnimals.length === 0) {
      return NextResponse.json(
        { message: "Animal not found", status: HttpStatusCode.NotFound },
        { status: HttpStatusCode.NotFound }
      );
    }

    await db.delete(animals).where(eq(animals.id, id));

    return NextResponse.json(
      { status: HttpStatusCode.Accepted, message: "Animal deleted successfully", data: null },
      { status: HttpStatusCode.Accepted }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { message: err.message, status: HttpStatusCode.InternalServerError },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
