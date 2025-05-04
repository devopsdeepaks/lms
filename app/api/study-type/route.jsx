import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm"; // Ensure eq is imported

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

            const contentList = await db.select().from(STUDY_TYPE_CONTENT_TABLE).where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId));

            const newcontentList = contentList?.find(item => item.type === 'flashCard');
            const newcontentListQuiz = contentList?.find(item => item.type === 'quiz');

            const result = {
                notes: notes,
                flashCard: newcontentList === undefined ? null : newcontentList.content,
                quiz: newcontentListQuiz === undefined ? null : newcontentListQuiz.content.questions,
                qa: null
            };

            return NextResponse.json(result);
        }

        // Handle the case where studyType is 'notes'
        else if (studyType === 'notes') {
            const notes = await db.select().from(CHAPTER_NOTES_TABLE)
                .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));
            return NextResponse.json({ notes: notes });
        }

        // Handle the case where studyType is 'flashCard' or others
        else {
            const result = await db.select().from(STUDY_TYPE_CONTENT_TABLE)
                .where(and(
                    eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId),
                    eq(STUDY_TYPE_CONTENT_TABLE?.type, studyType) // No .toLowerCase(), use as is
                ));

            if (!result[0]) {
                return NextResponse.json({ error: 'No data found for this studyType' }, { status: 404 });
            }
            return NextResponse.json(result[0]);
        }
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}


