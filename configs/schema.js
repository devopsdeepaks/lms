import { varbinary } from "drizzle-orm/mysql-core";
import { pgTable, serial, varchar, integer, text, boolean, json, PgTable } from "drizzle-orm/pg-core"; // Corrected imports

// USER_TABLE Schema
export const USER_TABLE = pgTable("user", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  isMember: boolean().default(false),
  customerId: varchar(), // Stripe customer ID
});

// STUDY_MATERIAL_TABLE Schema
export const STUDY_MATERIAL_TABLE = pgTable("studyMaterial", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  courseType: varchar().notNull(),
  topic: varchar().notNull(),
  difficultyLevel: varchar().default("Easy"),
  courseLayout: json(),
  createdBy: varchar().notNull(),
  status: varchar().default("Generating"),
});

// CHAPTER_NOTES_TABLE Schema
export const CHAPTER_NOTES_TABLE = pgTable('chapterNotes', {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: integer().notNull(),
  notes: text(),
});

export const STUDY_TYPE_CONTENT_TABLE=pgTable('studyTypeContent',{
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  content: json(),
  type:varchar().notNull(),
  status:varchar().default('Generating')
})

export const PAYMENT_RECORD_TABLE =pgTable('paymentRecord',{
  id:serial().primaryKey(),
  customerId:varchar(),
  sessionId:varchar(),
})