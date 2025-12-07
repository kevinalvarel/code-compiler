"use client";

import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const LoginButton = () => {
  const signinWithGithub = async () =>
    await authClient.signIn.social({
      callbackURL: "/home",
      provider: "github",
    });

  const signInWithGoogle = async () =>
    await authClient.signIn.social({
      callbackURL: "/home",
      provider: "google",
    });

  return (
    <div className="flex flex-col gap-3">
      <Button className="w-full" variant={"outline"} onClick={signinWithGithub}>
        Github <FaGithub />
      </Button>
      <Button className="w-full" variant={"outline"} onClick={signInWithGoogle}>
        Google <FaGoogle />
      </Button>
    </div>
  );
};
