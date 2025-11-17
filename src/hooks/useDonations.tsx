
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Donation, DashboardMetrics } from "@/types/database";

export const useDonations = (institutionId?: string, page = 1, limit = 10) => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalAmount: 0,
    totalDonations: 0,
    uniqueDonors: 0,
    pendingAmount: 0,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDonations = async () => {
    try {
      setLoading(true);

      if (!institutionId) {
        setDonations([]);
        setMetrics({
          totalAmount: 0,
          totalDonations: 0,
          uniqueDonors: 0,
          pendingAmount: 0,
        });
        setLoading(false);
        return;
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      // ✅ Consulta paginada — apenas para a tabela
      const { data: pageData, error: pageError, count } = await supabase
        .from("donations")
        .select("*", { count: "exact" })
        .eq("institution_id", institutionId)
        .order("created_at", { ascending: false })
        // .range(from, to);

      if (pageError) throw pageError;

      setDonations(pageData || []);
      setTotalCount(count || 0);

      // ✅ Consulta completa — para calcular métricas fixas
      const { data: allDonations, error: allError } = await supabase
        .from("donations")
        .select("amount, payment_status, donor_email")
        .eq("institution_id", institutionId);

      if (allError) throw allError;

      const approvedDonations = allDonations.filter((d) => d.payment_status === "approved");
      const pendingDonations = allDonations.filter((d) => d.payment_status === "pending");

      const totalAmount = approvedDonations.reduce((sum, d) => sum + Number(d.amount), 0);
      const pendingAmount = pendingDonations.reduce((sum, d) => sum + Number(d.amount), 0);
      const uniqueDonors = new Set(allDonations.map((d) => d.donor_email).filter(Boolean)).size;

      setMetrics({
        totalAmount,
        totalDonations: approvedDonations.length,
        uniqueDonors,
        pendingAmount,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao carregar doações",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institutionId, page]);

  return { donations, metrics, loading, totalCount, refetch: fetchDonations };
};
