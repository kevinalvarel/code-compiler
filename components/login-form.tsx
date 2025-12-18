"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginButton } from "./auth/login-button";
import { signInAction } from "@/servers/auth";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      const result = await signInAction(formData);

      if (result?.error) {
        toast.error("Login Gagal", {
          description: result.error,
        });
      }
    } catch {
      toast.error("Login Gagal", {
        description: "Terjadi kesalahan. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-card/30 backdrop-blur-3xl border border-white/20 shadow-2xl ring-1 ring-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Masuk ke Akun Kamu</CardTitle>
          <CardDescription>
            Pilih metode login yang kamu inginkan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OAuth Buttons */}
          <div className="flex flex-col gap-3">
            <LoginButton />
          </div>

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/80 px-3 text-muted-foreground">
                atau lanjutkan dengan email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-4" action={handleSubmit}>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                required
                disabled={isLoading}
                className="bg-background/50"
              />
            </Field>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a
                  href="#"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Lupa password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                disabled={isLoading}
                className="bg-background/50"
              />
            </Field>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-primary underline-offset-4 hover:underline"
            >
              Daftar sekarang
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
