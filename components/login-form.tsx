import { FaGithub, FaGoogle } from "react-icons/fa";

import { cn } from "@/lib/utils";

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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <form className="space-y-4">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
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
                type="password"
                required
                className="bg-background/50"
              />
            </Field>
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <a
              href="#"
              className="text-primary underline-offset-4 hover:underline"
            >
              Daftar sekarang
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
