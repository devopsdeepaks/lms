import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm"; // Ensure eq is imported

export async function POST(req) {
    try {
        // Extract data from the request body
        const { courseId, studyType } = await req.json();

        // Check if the required parameters are present
        if (!courseId || !studyType) {
            return NextResponse.json({ error: 'Missing courseId or studyType' }, { status: 400 });
        }

        // Handle the case where studyType is 'ALL'
        if (studyType === 'ALL') {
            const notes = await db.select().from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

            // Log the result to help with debugging
            console.log("Notes:", notes);

            // Prepare the response
            const result = {
                notes: notes,
                flashCard: null,
                quiz: null,
                qa: null
            };

            return NextResponse.json(result);
        }

        // Handle the case where studyType is 'notes'
        else if (studyType === 'notes') {
            const notes = await db.select().from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

            // Log the result to help with debugging
            console.log("Notes for specific studyType:", notes);

            // Return the specific notes data (you can modify this part as needed)
            return NextResponse.json({ notes: notes });
        }

        // Return an error for invalid studyType
        return NextResponse.json({ error: 'Invalid studyType' }, { status: 400 });

    } catch (error) {
        // Log the error and return a 500 error response
        console.error("Error in API route:", error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

    
