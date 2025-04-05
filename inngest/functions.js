import { db } from "@/configs/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { generateNotesAiModel, GenerateStudyTypeContentAimodel } from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;
    //Get Event Data
    const result = await step.run(
      "Check User and Create New User if not in db",
      async () => {
        //check is user already exist
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))
          .execute();

        console.log(result);
        if (result?.length == 0) {
          //if not , then add to db
          const userResp = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: USER_TABLE.id });
          return userResp;
        }
        return result;
      }
    );
    return { status: "success", data: result }; // Ensure final return
  }

  //Step:2 to send welcome email notification

  //Step:3 send email after joining of 3 days
);

export const GenerateNotes=inngest.createFunction(
  {id:'generate-course'},
  {event:'notes.generate'},
  async({event,step})=>{
    const {course}=event.data//all record  info

    //generate notes for each chapter with ai

    const noteResult=await step.run('Generate Chapter Notes',async()=>{
      const Chapters=course?.courseLayout?.chapters;
      let index=0;
      Chapters.forEach(async(chapter)=>{
        const PROMPT='Generate exam material for each chapter, make sure to includes all topics point in the content make sure to give content in HTML format( do not add HTMLKL, Head, Body, title tag), The chapters :  '+ JSON.stringify(chapter);
        const result=await generateNotesAiModel.sendMessage(PROMPT);
        const aiResp=result.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId:index,
          courseId:course?.courseId,
          notes:aiResp
        })
         index=index+1;

      })
      return'completed'
    })

//update status to ready
const updateCourseStatusResult=await step.run('Update Course Status to Ready',async()=>{
  const result=await db.update(STUDY_MATERIAL_TABLE).set({
    status:'Ready'
  }).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))

  return'Success'
});

  }
)
//used to generate flashcard ,quiz..
export const GenerateStudyTypeContent = inngest.createFunction(
  {
    id: 'Generate Study Type Content',
    event: 'studyType.content',  // This event name looks a bit like a string, so it should be correct
  },

  async ({ event, step }) => {
    // Destructure the event data properly
    const { studyType, prompt, courseId ,recordId} = event.data;
    const FlashcardAiResult=await step.run('Generating Flashcard using Ai',async()=>{
      const result=await GenerateStudyTypeContentAimodel.sendMessage(prompt);
      const AIResult=JSON.parse(result.response.text());
      return AIResult;
    })

    //save the result
    const DbResult=await step.run('save result in database',async()=>{
      const result=await db.insert(STUDY_MATERIAL_TABLE)
      .set({
       content:FlashcardAiResult
      }).where(eq(STUDY_MATERIAL_TABLE.id,recordId))

      return 'data inserted'
    })
  }
);