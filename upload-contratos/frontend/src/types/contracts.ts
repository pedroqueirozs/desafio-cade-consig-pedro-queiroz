export type TipoPlano = "BASICO" | "PRO" | "ENTERPRISE";
export type StatusContrato = "ATIVO" | "INATIVO";

export interface Contrato {
  id_contrato: string;
  nome_cliente: string;
  email_cliente: string;
  tipo_plano: TipoPlano;
  valor_mensal: string;
  status: StatusContrato;
  data_inicio: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
