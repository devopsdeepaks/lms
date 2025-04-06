import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {chapters,courseId,type}=await req.json();


    const PROMPT='Generate the flashcard on topic :'+chapters+' in JSON format with front back content , Maximum 15'
    
    //insert record to db

    const result=await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseId,
        type:type
    }).returning({id:STUDY_MATERIAL_TABLE.id});
//trigger inngest
    inngest.send({
        name:'studyType.content',
        data:{
            studyType:type,
            prompt:PROMPT,
            courseId:courseId,
            recordId:result[0].id
        }
    });

    return NextResponse.json({id:result[0].id});
}
