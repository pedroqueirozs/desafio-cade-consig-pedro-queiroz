"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { getContracts } from "@/app/services/contracts";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contrato } from "@/types/contracts";

export default function ContractsPage() {
  const [nomeCliente, setNomeCliente] = useQueryState("nome_cliente", {
    defaultValue: "",
  });

  const [status, setStatus] = useQueryState("status", {
    defaultValue: "",
  });

  const [tipoPlano, setTipoPlano] = useQueryState("tipo_plano", {
    defaultValue: "",
  });

  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["contratos", page, nomeCliente, status, tipoPlano],
    queryFn: () =>
      getContracts({
        page: Number(page),
        nome_cliente: nomeCliente || undefined,
        status: status || undefined,
        tipo_plano: tipoPlano || undefined,
      }),
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Contratos</h1>

      <div className="flex gap-4 mb-4">
        <input
          className="border px-2 py-1 rounded"
          placeholder="Nome do cliente"
          value={nomeCliente}
          onChange={(e) => {
            setPage("1");
            setNomeCliente(e.target.value);
          }}
        />

        <select
          className="border px-2 py-1 rounded"
          value={status}
          onChange={(e) => {
            setPage("1");
            setStatus(e.target.value);
          }}
        >
          <option value="">Status</option>
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
        </select>

        <select
          className="border px-2 py-1 rounded"
          value={tipoPlano}
          onChange={(e) => {
            setPage("1");
            setTipoPlano(e.target.value);
          }}
        >
          <option value="">Plano</option>
          <option value="BASICO">Básico</option>
          <option value="PRO">Pro</option>
          <option value="ENTERPRISE">Enterprise</option>
        </select>
      </div>

      {isLoading && <p>Carregando...</p>}

      {isError && <p>Erro ao buscar contratos</p>}

      {!isLoading && data && data.items.length === 0 && (
        <p>Nenhum contrato encontrado</p>
      )}

      {!isLoading && data && data.items.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Valor Mensal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Início</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.items.map((contrato: Contrato) => (
                <TableRow key={contrato.id_contrato}>
                  <TableCell>{contrato.id_contrato}</TableCell>
                  <TableCell>{contrato.nome_cliente}</TableCell>
                  <TableCell>{contrato.email_cliente}</TableCell>
                  <TableCell>{contrato.tipo_plano}</TableCell>
                  <TableCell>
                    R$ {Number(contrato.valor_mensal).toFixed(2)}
                  </TableCell>
                  <TableCell>{contrato.status}</TableCell>
                  <TableCell>
                    {new Date(contrato.data_inicio).toLocaleDateString("pt-BR")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex gap-2 mt-4">
            <button
              className="bg-black text-white px-2 py-1 rounded-md transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={data.page <= 1}
              onClick={() => setPage(String(data.page - 1))}
            >
              Página anterior
            </button>

            <button
              className="bg-black text-white px-2 py-1 rounded-md transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={data.page >= data.totalPages}
              onClick={() => setPage(String(data.page + 1))}
            >
              Próxima página
            </button>
          </div>
        </>
      )}
    </div>
  );
}
