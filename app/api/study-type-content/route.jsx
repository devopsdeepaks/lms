import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { chapters, courseId, type } = await req.json();


    const PROMPT = type == 'flashCard' ? 'Generate the flashcard on topic :' + chapters + ' in JSON format with front back content , Maximum 15' : 'Generate the quiz on topic :' + chapters + ' in JSON format with question and answer, Maximum 10';

    //insert record to db

    const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId: courseId,
        type: type
    }).returning({ id: STUDY_TYPE_CONTENT_TABLE.id });
    //Trigger the inngest function
    inngest.send({
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
