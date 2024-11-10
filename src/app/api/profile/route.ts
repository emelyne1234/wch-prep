import cloudinary from "cloudinary";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { options } from "@/auth";
import db from "@/server/db";
import { users } from "@/server/db/schema";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";
import { HttpStatusCode } from "axios";
import { sendResponse } from "next/dist/server/image-optimizer";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const PATCH = async (req: NextRequest) => {
  const userId = await getUserIdFromSession();

  if (!userId) {
    return NextResponse.json(
      { status: 401, message: "Unauthorized", data: null },
      { status: HttpStatusCode.Unauthorized }
    );
  }
  const body = await req.json();
  if (body instanceof NextResponse) {
    return body;
  }

  if (Object.keys(body).length === 0) {
    return NextResponse.json(
      { status: 400, message: "No fields provided to update!", data: null },
      { status: HttpStatusCode.Unauthorized }
    );
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { status: 404, message: "User not found", data: null },
        { status: HttpStatusCode.NotFound }
      );
    }

    const updateData = {
      ...body,
    };

    await db.update(users).set(updateData).where(eq(users.id, userId));

    return NextResponse.json(
      { status: 200, message: "Profile updated successfully", data: null },
      { status: HttpStatusCode.Accepted }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { status: 500, message: "Error occurred", data: null },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
