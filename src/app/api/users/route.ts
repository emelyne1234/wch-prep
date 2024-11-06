import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { roles, users } from "@/server/db/schema";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { passwordSchema } from "@/utils/validateFields/passwordSchema";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {
      email,
      username,
      password,
      expertise,
      bio,
    } = await req.json();

    try {
      passwordSchema.parse(password);
    } catch (validationError: any) {
      return NextResponse.json({
        status: 400,
        data: null,
        message: validationError.errors[0].message,
      });
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, email as string),
          eq(users.username, username)
        )
      )
      .limit(1);

    if (existingUser.length > 0) {
      const existingField = existingUser[0].email === email ? "email" : "username";
      return NextResponse.json({
        status: 400,
        data: null,
        message: `${existingField} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = await db
      .select({ Id: roles.id, Name: roles.name })
      .from(roles)
      .where(eq(roles.name, "member"))
      .limit(1);

    await db.insert(users).values({
      email: email,
      username: username,
      password: hashedPassword,
      expertise: expertise,
      bio: bio,
      role_id: userRole[0].Id,
    });

    const message = "User created successfully";
    return NextResponse.json({
      status: 200,
      data: null,
      message,
    });

  } catch (error: unknown) {
    const Error = error as Error;
    return NextResponse.json({
      status: 500,
      data: null,
      message: Error.message,
    });
  }
}
