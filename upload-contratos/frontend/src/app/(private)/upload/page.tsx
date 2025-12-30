"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      toast.error("Nenhum arquivo selecionado");

      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    const token = localStorage.getItem("token");

    try {
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
    } catch (error) {
      toast.error("Erro no upload", {
        description: "Não foi possível enviar o arquivo CSV.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button type="submit">Enviar CSV</button>
    </form>
  );
}
