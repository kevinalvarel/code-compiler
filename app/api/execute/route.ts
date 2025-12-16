import { NextRequest, NextResponse } from "next/server";
import { LANGUAGE_VERSIONS } from "@/utils/constant";

const PISTON_API = "https://emkc.org/api/v2/piston/execute";

// Map language names to Piston API language names
const LANGUAGE_MAP: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  java: "java",
  csharp: "csharp",
  php: "php",
};

export async function POST(request: NextRequest) {
  try {
    const { language, code } = await request.json();

    if (!language || !code) {
      return NextResponse.json(
        { error: "Language and code are required" },
        { status: 400 }
      );
    }

    const pistonLanguage = LANGUAGE_MAP[language] || language;
    const version =
      LANGUAGE_VERSIONS[language as keyof typeof LANGUAGE_VERSIONS];

    const response = await fetch(PISTON_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: pistonLanguage,
        version: version,
        files: [
          {
            content: code,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Piston API error: ${response.status}`);
    }

    const result = await response.json();

    // Combine stdout and stderr
    const output = result.run?.stdout || "";
    const error = result.run?.stderr || "";
    const exitCode = result.run?.code || 0;

    return NextResponse.json({
      output: output,
      error: error,
      exitCode: exitCode,
    });
  } catch (error) {
    console.error("Execution error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to execute code",
      },
      { status: 500 }
    );
  }
}
