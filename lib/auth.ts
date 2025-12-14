import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index"; // Adjust path to your database connection
import { headers } from "next/headers";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  plugins: [nextCookies()],
  session: {
    expiresIn: 60 * 60 * 24, // 1 Hari
    updateAge: 60 * 60 * 24, // 1 Hari (Setiap satu hari sesi diperbarui)
  },
  database: drizzleAdapter(db, {
    provider: "pg", // untuk neon postgres
  }),
  pages: {
    signIn: "/login",
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  // Add other providers/options as needed
});

export const getSession = async () =>
  auth.api.getSession({
    headers: await headers(),
  });
