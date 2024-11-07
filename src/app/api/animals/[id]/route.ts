import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { animals } from "@/server/db/schema";
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

        const existinganimals = await db.select().from(animals).where(eq(animals.id, id))
    
        if(existinganimals.length === 0){
            return NextResponse.json({message: "animals not found", status: 200}, {status: HttpStatusCode.BadRequest})
        }
        const updateData = {
            ...body,
            updated_at: new Date(),
            updated_by: userId!,
          };

          await db.update(animals).set(updateData).where(eq(animals.id, id))
    
          return NextResponse.json({
            status: 200,
            message: "animals updated successfully",
            data: updateData,
          }); 
        }catch (error) {
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

        const existinganimals = await db.select().from(animals).where(eq(animals.id, id))
    
        if(existinganimals.length === 0){
            return NextResponse.json({message: "animals not found", status: 200}, {status: HttpStatusCode.BadRequest})
        }
          await db.delete(animals).where(eq(animals.id, id))
    
          return NextResponse.json({
            status: 200,
            message: "animals deleted successfully",
            data: null,
          });    }catch (error) {
        const Error = error as Error;
        return NextResponse.json({ message: Error.message }, { status: 500 });
    }
}