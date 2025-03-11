import { courseOutline } from "@/configs/AiModel";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";

export async function POST(req) {

    const{courseId,topic,courseType,difficultyLevel,createdBy}=await req.json();


    const PROMPT='generate a study material for '+topic+' for'+courseType+'and '+courseId+'and'+difficultyLevel+'and'+createdBy+'and'
    //generate course layout using ai
    const aiResp=await courseOutline.sendMessage(PROMPT)
    const aiResult=JSON.parse(aiResp.response.text());

    //save the result along with user input
   const dbResult=await db.insert(STUDY_MATERIAL_TABLE).values({
    courseId:courseId,
    courseType:courseType,
    createdBy:createdBy,
    topic:topic,
    courseLayout:aiResult
   }).returning({STUDY_MATERIAL_TABLE})

   console.log(dbResult);

    return NextResponse.json({result:dbResult[0]});
    
}