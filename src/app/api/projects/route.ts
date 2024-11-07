// import { NextResponse, NextRequest } from "next/server";
// import { db } from "@/server/db";
// import { HttpStatusCode } from "axios";
// import { projects, animals } from "@/server/db/schema";
// import { eq, sql } from "drizzle-orm";
// import { getUserIdFromSession } from "@/utils/getUserIdFromSession";

// export async function POST(req: NextRequest) {
//   try {
//     const userId = await getUserIdFromSession();

//     if (!userId) {
//       return NextResponse.json(
//         { status: 401, message: "Unauthorized", data: null },
//         { status: HttpStatusCode.Unauthorized }
//       );
//     }
//     const findAnimals = await db.select().from(animals).where(eq(animals.i))

//     const { title, description, status } = await req.json();

//     await db.insert(projects).values({
//       name: name,
//       species: species,
//       description: description,
//       habitat: habitat,
//       status: status
//     });

//     return NextResponse.json(
//       { status: 200, message: "projects saved successfully", data: null },
//       { status: HttpStatusCode.Accepted }
//     );

//   } catch (error: unknown) {
//     const Error = error as Error;
//     return NextResponse.json({
//       status: 500,
//       data: null,
//       message: Error.message,
//     });
//   }
// }

// export async function GET(req: NextRequest) {
//     try {
//       const userId = await getUserIdFromSession();
  
//       if (!userId) {
//         return NextResponse.json(
//           { status: 401, message: "Unauthorized", data: null },
//           { status: HttpStatusCode.Unauthorized }
//         );
//       }
  
//       const { searchParams } = new URL(req.url);
//       const page = parseInt(searchParams.get("page") || "1", 10);
//       const pageSize = parseInt(searchParams.get("pageSize") || "3", 10);
//       const offset = (page - 1) * pageSize;
  
//       const totalRecordsResult = await db
//       .select({
//         count: sql`COUNT(*)`.as("count"),
//       })
//       .from(projects);
//       const totalRecords =  Number(totalRecordsResult[0]?.count) || 0;
//       const totalPages = Math.ceil(totalRecords / pageSize);
  
//       const data = await db
//         .select({
//           id: projects.id,
//           species: projects.species,
//           description: projects.description,
//           habitat: projects.habitat,
//           status: projects.status,
//         })
//         .from(projects)
//         .offset(offset)
//         .limit(pageSize);
  
//       return NextResponse.json({
//         status: 200,
//         data: data,
//         pagination: {
//           page,
//           pageSize,
//           totalRecords,
//           totalPages,
//         },
//         message: "Fetched projects successfully",
//       });
  
//     } catch (error: unknown) {
//       const Error = error as Error;
//       return NextResponse.json({
//         status: 500,
//         data: null,
//         message: Error.message,
//       });
//     }
//   }