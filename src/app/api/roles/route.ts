import { NextResponse, NextRequest } from "next/server";
import { db } from "@/server/db";
import { roles } from "@/server/db/schema";
import { HttpStatusCode } from "axios";
import { eq } from "drizzle-orm"

export async function POST(req:NextRequest){
    try{

        const {name, description} = await req.json();
        if(!name || !description){
            return NextResponse.json({
                message: "All fields are required"
            },
            {status: HttpStatusCode.BadRequest}
        )
        }

        const insertData = await db.insert(roles).values({
            name: name,
            description: description
        })

            return NextResponse.json({
                message: "roles registered successfully"
            },{ status: HttpStatusCode.Created })



    } catch (error: unknown) {
        let errorMessage = "An unexpected error occurred";
    
        if (error instanceof Error) {
          errorMessage = error.message;
        }
    
        return NextResponse.json({ message: errorMessage }, { status: 500 });
      }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const roleName = searchParams.get('roleName');
  
    try {
      if (roleName) {
        const role = await db.select().from(roles).where(eq(roles.name, roleName));
  
        if (role.length === 0) {
          return NextResponse.json({ message: "Role not found" }, { status: 404 });
        }
  
        return NextResponse.json({ roleId: role[0].id });
      } else {
        const allRoles = await db.select().from(roles);
        
        if (allRoles.length === 0) {
          return NextResponse.json({ message: "No roles found" }, { status: 404 });
        }
  
        return NextResponse.json(allRoles);
      }
    } catch (error) {
      const Error = error as Error;
      return NextResponse.json({ message: Error.message }, { status: 500 });
    }
}