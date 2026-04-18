import { model, extractJson } from "@/configs/AiModel";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { db } from "@/configs/db";
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

    const PROMPT = `Generate a study material for ${topic} for ${courseType} with difficulty level ${difficultyLevel}. Return ONLY a valid JSON object with keys: course_title, course_description, chapters (array with chapter_number, chapter_title, chapter_summary, topics array with topic_title and topic_description).`;

    const aiResp = await model.generateContent(PROMPT);
    const aiText = await aiResp.response.text();

    let aiResult;
    try {
      aiResult = extractJson(aiText);
    } catch (error) {
      console.error("AI Response Parsing Error:", error, "\nRaw:", aiText.slice(0, 200));
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
    try {
      const result = await inngest.send({
        name: "notes.generate",
        data: {
          course: dbResult[0].resp,
        },
      });
      console.log("ye hai chapter notes ka result ji", result);
    } catch (inngestErr) {
      console.warn("Inngest send failed (notes won't generate async):", inngestErr?.message);
    }

    console.log("Database Insert Successful:", dbResult);
    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("Request Handling Error:", error);

    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
