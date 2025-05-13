
// Arquivo de tipos para integração com Supabase
import { Database as SupabaseDatabase } from "@/integrations/supabase/types";

// Estendendo os tipos do Supabase para incluir a tabela institutions
export interface Institution {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  profile_id?: string;
  verified?: boolean;
  created_at?: string;
  updated_at?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  website?: string;
}

// Tipo para as operações Supabase com a tabela institutions
export type InstitutionResponse = Awaited<ReturnType<typeof fetchInstitutions>>;

// Função helper para buscar instituições (apenas para definição de tipos)
async function fetchInstitutions() {
  return { data: [] as Institution[] }; 
}
