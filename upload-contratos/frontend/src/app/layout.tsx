import type { Metadata } from "next";
import { QueryProvider } from "@/providers/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Sistema de Contratos - CadeConsig",
  description: "Desafio técnico para vaga de desenvolvedor full stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Toaster richColors position="top-right" />
        <QueryProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
