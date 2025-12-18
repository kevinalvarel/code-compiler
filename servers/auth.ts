"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Sign Up Action
export async function signUpAction(
  formData: FormData
): Promise<{ error: string } | void> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return { error: "Semua field harus diisi." };
    }

    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
  } catch (error) {
    console.error("Sign up error:", error);
    return { error: "Gagal mendaftar. Email mungkin sudah terdaftar." };
  }

  redirect("/login");
}

// Sign In Action
export async function signInAction(
  formData: FormData
): Promise<{ error: string } | void> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Email dan password harus diisi." };
    }

    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (!result) {
      return { error: "Email atau password salah." };
    }
  } catch (error) {
    console.error("Sign in error:", error);
    return { error: "Email atau password salah. Silakan coba lagi." };
  }

  redirect("/home");
}

// Sign Out Action
export async function signOutAction(): Promise<void> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Sign out error:", error);
  }

  redirect("/");
}
