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
import { signUpAction } from "@/servers/auth";
import Link from "next/link";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      const result = await signUpAction(formData);

      if (result?.error) {
        toast.error("Pendaftaran Gagal", {
          description: result.error,
        });
      }
    } catch {
      toast.error("Pendaftaran Gagal", {
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
          <CardTitle className="text-2xl">Buat Akun Baru</CardTitle>
          <CardDescription>
            Mulai perjalanan coding kamu dengan mendaftar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Registration Form */}
          <form className="space-y-4" action={handleSubmit}>
            <Field>
              <FieldLabel htmlFor="name">Nama</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nama lengkap"
                required
                disabled={isLoading}
                className="bg-background/50"
              />
            </Field>
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
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Minimal 8 karakter"
                required
                minLength={8}
                disabled={isLoading}
                className="bg-background/50"
              />
            </Field>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Daftar"}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-primary underline-offset-4 hover:underline"
            >
              Masuk di sini
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
