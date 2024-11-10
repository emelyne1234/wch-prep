import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { resources } from "@/server/db/schema";
import { eq } from "drizzle-orm"
import { HttpStatusCode } from "axios";
import { getUserIdFromSession } from "@/utils/getUserIdFromSession";


export async function PATCH(req: NextRequest, {params}: {params: Promise<{ id: string }>}){

    try{
        const userId = await getUserIdFromSession();

        if (!userId) {
          return NextResponse.json(
            { status: 401, message: "Unauthorized", data: null },
            { status: HttpStatusCode.Unauthorized }
          );
        }

        const { id } = await params;

        const body = await req.json();

        const existingResources = await db.select().from(resources).where(eq(resources.id, id))
    
        if(existingResources.length === 0){
            return NextResponse.json({message: "Resources not found", status: 200}, {status: HttpStatusCode.BadRequest})
        }
        const updateData = {
            ...body,
            updated_at: new Date(),
            updated_by: userId!,
          };

          await db.update(resources).set(updateData).where(eq(resources.id, id))
    
          return NextResponse.json({
            status: 200,
            message: "resources updated successfully",
            data: updateData,
          }); 
        }catch (error) {
        const Error = error as Error;
        return NextResponse.json({ message: Error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, {params}: {params: Promise<{ id: string }>}){

    try{
        const userId = await getUserIdFromSession();

        if (!userId) {
          return NextResponse.json(
            { status: 401, message: "Unauthorized", data: null },
            { status: HttpStatusCode.Unauthorized }
          );
        }

        const { id } = await params;

        const existingResources = await db.select().from(resources).where(eq(resources.id, id))
    
        if(existingResources.length === 0){
            return NextResponse.json({message: "Resources not found", status: 200}, {status: HttpStatusCode.BadRequest})
        }
          await db.delete(resources).where(eq(resources.id, id))
    
          return NextResponse.json({
            status: 200,
            message: "resources deleted successfully",
            data: null,
          });    }catch (error) {
        const Error = error as Error;
        return NextResponse.json({ message: Error.message }, { status: 500 });
    }
}