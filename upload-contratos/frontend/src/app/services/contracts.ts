import { api } from "./api";
import { PaginatedResponse, Contrato } from "@/types/contracts";

export async function getContracts(page: number) {
  const response = await api.get<PaginatedResponse<Contrato>>("/contratos", {
    params: { page },
  });

  return response.data;
}
