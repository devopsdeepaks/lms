import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { chapters, courseId, type } = await req.json();

    if (!chapters || !courseId || !type) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const PROMPT = type === 'flashCard'
        ? 'Generate the flashcard on topic: ' + chapters + ' in JSON format as an array of objects with "front" and "back" fields. Maximum 15 cards. Return only valid JSON array.'
        : 'Generate a quiz on topic: ' + chapters + ' in JSON format as an object with a "questions" array. Each question must have "question", "options" (array of 4 strings), and "correctAnswer" fields. Maximum 10 questions. Return only valid JSON.';

    const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId: courseId,
        type: type
    }).returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

    await inngest.send({
        name: 'studyType.content',
        data: {
            studyType: type,
            prompt: PROMPT,
            courseId: courseId,
            recordId: result[0].id
        }
    });

    return NextResponse.json({ id: result[0].id });
}
