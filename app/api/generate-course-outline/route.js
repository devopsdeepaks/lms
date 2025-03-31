import { courseOutline } from "@/configs/AiModel";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { db } from "@/configs/db"; // Ensure correct import
import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";

export async function POST(req) {
  try {
    const { courseId, topic, courseType, difficultyLevel, createdBy } =
      await req.json();
    if (!courseId || !courseType || !topic || !difficultyLevel || !createdBy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    // console.log("course ka type", courseType);
    // console.log("course ka id", courseId);
    // console.log("course ka topic", topic);
    // console.log("course ka difficulty level", difficultyLevel);
    // console.log("course ka created by", createdBy);
    const PROMPT = `Generate a study material for ${topic} for ${courseType} and ${courseId} and ${difficultyLevel} and ${createdBy}`;
    // Generate course layout using AI
    const aiResp = await courseOutline.sendMessage(PROMPT);
    const aiText = await aiResp.response.text();
    // console.log("ye hi wala aaya hai", aiText);

    let aiResult;
    try {
      aiResult = JSON.parse(aiText);
    } catch (error) {
      console.error("AI Response Parsing Error:", error);
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 500 }
      );
    }

    // Save to database
    console.log("Database Insert Started...");
    const dbResult = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId,
        courseType,
        createdBy,
        difficultyLevel,
        topic,
        courseLayout: aiResult,
      })
      .returning({ resp: STUDY_MATERIAL_TABLE });

      //trigger the innest fun to gene. chapter notes

      const result=await inngest.send({
        name:'notes.generate',
        data:{
          course:dbResult[0].resp
        }
      });
      console.log(result);

    console.log("Database Insert Successful:", dbResult);
    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("Request Handling Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

