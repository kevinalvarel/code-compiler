"use client";

import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const Spinner = () => (
  <svg
    className="h-4 w-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const LoginButton = () => {
  const [isLoading, setIsLoading] = useState<"github" | "google" | null>(null);

  const signinWithGithub = async () => {
    setIsLoading("github");
    try {
      await authClient.signIn.social({
        callbackURL: "/home",
        provider: "github",
      });
    } catch (error) {
      console.error("Github sign in error:", error);
      setIsLoading(null);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading("google");
    try {
      await authClient.signIn.social({
        callbackURL: "/home",
        provider: "google",
      });
    } catch (error) {
      console.error("Google sign in error:", error);
      setIsLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        className="w-full"
        variant={"outline"}
        onClick={signinWithGithub}
        disabled={isLoading !== null}
      >
        {isLoading === "github" ? (
          <>
            <Spinner /> Menghubungkan...
          </>
        ) : (
          <>
            Github <FaGithub />
          </>
        )}
      </Button>
      <Button
        className="w-full"
        variant={"outline"}
        onClick={signInWithGoogle}
        disabled={isLoading !== null}
      >
        {isLoading === "google" ? (
          <>
            <Spinner /> Menghubungkan...
          </>
        ) : (
          <>
            Google <FaGoogle />
          </>
        )}
      </Button>
    </div>
  );
};
