import { db } from "@/db";
import { snippets } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET snippet by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [snippet] = await db
      .select()
      .from(snippets)
      .where(eq(snippets.id, id))
      .limit(1);

    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    // Check if snippet is private and user is not the owner
    if (!snippet.isPublic) {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session || session.user.id !== snippet.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return NextResponse.json({ snippet });
  } catch (error) {
    console.error("Error fetching snippet:", error);
    return NextResponse.json(
      { error: "Failed to fetch snippet" },
      { status: 500 }
    );
  }
}

// UPDATE snippet
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, code, language, isPublic } = body;

    // Check if snippet exists and belongs to user
    const [existingSnippet] = await db
      .select()
      .from(snippets)
      .where(and(eq(snippets.id, id), eq(snippets.userId, session.user.id)))
      .limit(1);

    if (!existingSnippet) {
      return NextResponse.json(
        { error: "Snippet not found or unauthorized" },
        { status: 404 }
      );
    }

    // Update snippet
    const [updatedSnippet] = await db
      .update(snippets)
      .set({
        title: title || existingSnippet.title,
        description: description ?? existingSnippet.description,
        code: code || existingSnippet.code,
        language: language || existingSnippet.language,
        isPublic: isPublic ?? existingSnippet.isPublic,
        updatedAt: new Date(),
      })
      .where(eq(snippets.id, id))
      .returning();

    return NextResponse.json({ success: true, snippet: updatedSnippet });
  } catch (error) {
    console.error("Error updating snippet:", error);
    return NextResponse.json(
      { error: "Failed to update snippet" },
      { status: 500 }
    );
  }
}

// DELETE snippet
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if snippet exists and belongs to user
    const [existingSnippet] = await db
      .select()
      .from(snippets)
      .where(and(eq(snippets.id, id), eq(snippets.userId, session.user.id)))
      .limit(1);

    if (!existingSnippet) {
      return NextResponse.json(
        { error: "Snippet not found or unauthorized" },
        { status: 404 }
      );
    }

    await db.delete(snippets).where(eq(snippets.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting snippet:", error);
    return NextResponse.json(
      { error: "Failed to delete snippet" },
      { status: 500 }
    );
  }
}