"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { getContracts } from "@/app/services/contracts";

export default function ContractaPage() {
  // URL ?page=1
  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["contratos", page],
    queryFn: () => getContracts(Number(page)),
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isError) {
    return <p>Erro ao buscar contratos</p>;
  }

  if (!data || data.items.length === 0) {
    return <p>Nenhum contrato encontrado</p>;
  }

  return (
    <div>
      <h1>Contratos</h1>

      {data.items.map((contrato) => (
        <div key={contrato.id_contrato}>
          <p>{contrato.nome_cliente}</p>
          <p>{contrato.email_cliente}</p>
        </div>
      ))}

      <button
        disabled={data.page <= 1}
        onClick={() => setPage(String(data.page - 1))}
      >
        Página anterior
      </button>

      <button
        disabled={data.page >= data.totalPages}
        onClick={() => setPage(String(data.page + 1))}
      >
        Próxima página
      </button>
    </div>
  );
}
