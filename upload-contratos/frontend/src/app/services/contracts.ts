type GetContractsParams = {
  page: number;
  nome_cliente?: string;
  status?: string;
  tipo_plano?: string;
};

export async function getContracts(params: GetContractsParams) {
  const token = localStorage.getItem("token");

  const searchParams = new URLSearchParams();

  searchParams.append("page", String(params.page));

  if (params.nome_cliente) {
    searchParams.append("nome_cliente", params.nome_cliente);
  }

  if (params.status) {
    searchParams.append("status", params.status);
  }

  if (params.tipo_plano) {
    searchParams.append("tipo_plano", params.tipo_plano);
  }

  const response = await fetch(
    `http://localhost:3000/contratos?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar contratos");
  }

  return response.json();
}
