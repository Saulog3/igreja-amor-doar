
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

// Tipo para doações
export interface Donation {
  id: string;
  institution_id: string;
  donor_email?: string;
  donor_name?: string;
  amount: number;
  payment_method?: string;
  payment_status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'refunded';
  payment_id?: string;
  created_at?: string;
  updated_at?: string;
}

// Tipos para métricas do dashboard
export interface DashboardMetrics {
  totalAmount: number;
  totalDonations: number;
  uniqueDonors: number;
  pendingAmount: number;
}

// Tipo para as operações Supabase com a tabela institutions
export type InstitutionResponse = Awaited<ReturnType<typeof fetchInstitutions>>;

// Função helper para buscar instituições (apenas para definição de tipos)
async function fetchInstitutions() {
  return { data: [] as Institution[] }; 
}
