"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Sign Up Action
export async function signUpAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    redirect("/login");
  } catch (error) {
    console.error("Sign up error:", error);
    throw error; // atau return { error: "Gagal mendaftar" }
  }
}

// Sign In Action
export async function signInAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    console.log("Login result:", result); // Debug
  } catch (error) {
    console.error("Sign in error:", error);
    throw error; // atau return { error: "Login gagal" }
  }

  redirect("/home");
}

// Sign Out Action
export async function signOutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Sign out error:", error);
  }

  redirect("/login");
}
