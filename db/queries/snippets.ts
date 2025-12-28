import { db } from "@/db";
import { snippets } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getRecentSnippets(userId: string, limit: number = 8) {
  return await db
    .select()
    .from(snippets)
    .where(eq(snippets.userId, userId))
    .orderBy(desc(snippets.updatedAt))
    .limit(limit);
}

export async function getSnippetById(id: string) {
  const result = await db
    .select()
    .from(snippets)
    .where(eq(snippets.id, id))
    .limit(1);
  return result[0] ?? null;
}

export async function getSnippetsByUserId(userId: string) {
  return await db
    .select()
    .from(snippets)
    .where(eq(snippets.userId, userId))
    .orderBy(desc(snippets.updatedAt));
}
