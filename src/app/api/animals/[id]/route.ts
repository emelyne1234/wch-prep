import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { animals } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { HttpStatusCode } from "axios";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";

type Params = Promise<{ id: string }>

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const body = await request.json();
    const existingAnimals = await db
      .select()
      .from(animals)
      .where(eq(animals.id, id));

    if (existingAnimals.length === 0) {
      return NextResponse.json(
        { message: "Animal not found", data: null },
        { status: HttpStatusCode.NotFound }
      );
    }

    const updateData = {
      ...body,
      updated_at: new Date(),
      updated_by: userId!,
    };

    await db.update(animals).set(updateData).where(eq(animals.id, id));

    return NextResponse.json({
      status: 200,
      message: "animals updated successfully",
      data: updateData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal server error",
        data: null,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", data: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }

    const existingAnimals = await db
      .select()
      .from(animals)
      .where(eq(animals.id, id));

    if (existingAnimals.length === 0) {
      return NextResponse.json(
        { message: "Animal not found", data: null },
        { status: HttpStatusCode.NotFound }
      );
    }

    await db.delete(animals).where(eq(animals.id, id));

    return NextResponse.json({
      status: 200,
      message: "animals deleted successfully",
      data: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal server error",
        data: null,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
