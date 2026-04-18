import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    try {
        const result = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, email));
        return NextResponse.json(result[0] ?? null);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}
