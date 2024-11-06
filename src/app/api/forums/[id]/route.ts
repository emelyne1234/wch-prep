import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { forums, users } from "@/server/db/schema";
import { eq } from "drizzle-orm"
import { HttpStatusCode } from "axios";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";


export async function PATCH(req: NextRequest, {params}: {params: {id:string}}){

    try{
        const userId = await getUserIdFromSession();

        if (!userId) {
          return NextResponse.json(
            { status: 401, message: "Unauthorized", data: null },
            { status: HttpStatusCode.Unauthorized }
          );
        }

        const id = params.id

        const body = await req.json();

        const existingForum = await db.select().from(forums).where(eq(forums.id, id))
    
        if(existingForum.length === 0){
            return NextResponse.json({message: "forum not found", status: 200}, {status: HttpStatusCode.BadRequest})
        }
        const updateData = {
            ...body,
            updated_at: new Date(),
            updated_by: userId!,
          };

          await db.update(forums).set(updateData).where(eq(forums.id, id))
    
          return NextResponse.json({
            status: 200,
            message: "Forum updated successfully",
            data: updateData,
          });    }catch (error) {
        const Error = error as Error;
        return NextResponse.json({ message: Error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, {params}: {params: {id:string}}){

    try{
        const userId = await getUserIdFromSession();

        if (!userId) {
          return NextResponse.json(
            { status: 401, message: "Unauthorized", data: null },
            { status: HttpStatusCode.Unauthorized }
          );
        }

        const id = params.id

        const existingForum = await db.select().from(forums).where(eq(forums.id, id))
    
        if(existingForum.length === 0){
            return NextResponse.json({message: "forum not found", status: 200}, {status: HttpStatusCode.BadRequest})
        }
          await db.delete(forums).where(eq(forums.id, id))
    
          return NextResponse.json({
            status: 200,
            message: "Forum deleted successfully",
            data: null,
          });    }catch (error) {
        const Error = error as Error;
        return NextResponse.json({ message: Error.message }, { status: 500 });
    }
}