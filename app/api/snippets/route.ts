import { db } from "@/db";
import { snippets } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, code, language, isPublic = false } = body;

    if (!code || !language) {
      return NextResponse.json(
        { error: "Code and language are required" },
        { status: 400 }
      );
    }

    const id = nanoid(10);
    const now = new Date();

    const [snippet] = await db
      .insert(snippets)
      .values({
        id,
        userId: session.user.id,
        title: title || `Untitled ${language} snippet`,
        description: description || null,
        code,
        language,
        isPublic,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json({ success: true, snippet }, { status: 201 });
  } catch (error) {
    console.error("Error saving snippet:", error);
    return NextResponse.json(
      { error: "Failed to save snippet" },
      { status: 500 }
    );
  }
}