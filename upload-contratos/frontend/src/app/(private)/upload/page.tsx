"use client";

import { useState } from "react";
import { toast } from "sonner";

function getTokenFromCookie() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      toast.error("Nenhum arquivo selecionado");
      return;
    }

    const token = getTokenFromCookie();

    if (!token) {
      toast.error("Usuário não autenticado");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:3000/contratos/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar CSV");
      }

      const data = await response.json();

      toast.success("Upload realizado com sucesso", {
        description: `${data.inserted} contratos inseridos.`,
      });

      setFile(null);
    } catch (error) {
      toast.error("Erro no upload", {
        description: "Não foi possível enviar o arquivo CSV.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">Upload de contratos (CSV)</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 border rounded-lg p-6 shadow-sm"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium">Arquivo CSV</label>

          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-medium
            file:bg-primary file:text-primary-foreground
            hover:file:opacity-90
          "
          />

          <p className="text-xs text-muted-foreground">
            Envie um arquivo CSV com até 100 contratos
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="
          w-full rounded-md px-4 py-2 text-sm font-medium
          bg-primary text-primary-foreground
          hover:opacity-90
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        >
          {isLoading ? "Enviando..." : "Enviar CSV"}
        </button>
      </form>
    </div>
  );
}
