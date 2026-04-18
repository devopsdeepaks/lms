import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user } = await req.json();
    const result = await inngest.send({
      name: "user.create",
      data: {
        user: user,
      },
    });
    return NextResponse.json({ result: result });
  } catch (error) {
    console.error("create-user error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
