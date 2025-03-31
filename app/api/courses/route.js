// import { db } from "@/configs/db";
// import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
// import { desc, eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     // Parse the incoming JSON body to get `createdBy`
//     const { createdBy } = await req.json();

//     // Execute the query to fetch study materials
//     const result = await db
//       .select()
//       .from(STUDY_MATERIAL_TABLE)
//       .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy))
//       .orderBy(desc(STUDY_MATERIAL_TABLE.id))
//       .execute(); // Ensure .execute() is uncommented to execute the query

//     // Return the result as a JSON response
//     return NextResponse.json({ result });
//   } catch (error) {
//     // Log the error for debugging
//     console.error("Error fetching courses:", error);

//     // Return an error response in case of failure
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req) {

//   const reqUrl=req.url;
//   const {searchParams}=new url(reqUrl);
//   const courseId=searchParams?.get('courseId');

//   const course=await db.select().from(STUDY_MATERIAL_TABLE)
//   .where(eq(STUDY_MATERIAL_TABLE?.courseId,courseId));

//   return NextResponse.json({result:course[0]})
// }
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the incoming JSON body to get `createdBy`
    const { createdBy } = await req.json();

    // Check if createdBy is provided
    if (!createdBy) {
      return NextResponse.json(
        { error: "createdBy is required" },
        { status: 400 }
      );
    }

    // Execute the query to fetch study materials
    const result = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy))
      .orderBy(desc(STUDY_MATERIAL_TABLE.id))
      .execute(); // Ensure .execute() is uncommented to execute the query

    // Return the result as a JSON response
    return NextResponse.json({ result });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching courses:", error);

    // Return an error response in case of failure
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl, "http://localhost:3000"); // Add base URL for parsing
    const courseId = searchParams?.get("courseId");
    console.log("course ki id: ", courseId);
    // Check if courseId is provided
    if (!courseId) {
      return NextResponse.json(
        { error: "courseId is required" },
        { status: 400 }
      );
    }

    // Fetch course data from the database
    const course = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId))
      .execute(); // Ensure you execute the query

    // If no course found, return a 404 error
    if (!course || course.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Return the course data
    return NextResponse.json({ result: course[0] });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
