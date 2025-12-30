"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormData } from "@/schemas/login-schema";
import { api } from "@/app/services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setApiError(null);

    try {
      const response = await api.post("/login", data);

      const { access_token } = response.data;
      document.cookie = `token=${access_token}; path=/`;

      router.push("/contracts");
    } catch (error) {
      setApiError("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input placeholder="Usuário" {...register("usuario")} />
              {errors.usuario && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.usuario.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Senha"
                {...register("senha")}
              />
              {errors.senha && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.senha.message}
                </p>
              )}
            </div>

            {apiError && <p className="text-sm text-red-500">{apiError}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
