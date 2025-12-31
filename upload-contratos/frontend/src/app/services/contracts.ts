type GetContractsParams = {
  page: number;
  nome_cliente?: string;
  status?: string;
  tipo_plano?: string;
};

function getTokenFromCookie() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
}

export async function getContracts(params: GetContractsParams) {
  const token = getTokenFromCookie();

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
  console.log(response);
  if (!response.ok) {
    throw new Error("Erro ao buscar contratos");
  }

  return response.json();
}
