import { boolean } from "drizzle-orm/gel-core";
import { varchar } from "drizzle-orm/pg-core";
import { pgTable,serial } from "drizzle-orm/pg-core";


export const USER_TABLE=pgTable('user',{
    id:serial().primaryKey(),
    name:varchar().notNull(),
    email:varchar().notNull(),
    isMember:boolean().default(false)
});


//npx drizzle-kit studio    to run database loaclly