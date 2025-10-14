
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Donation, DashboardMetrics } from "@/types/database";

export const useDonations = (institutionId?: string) => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalAmount: 0,
    totalDonations: 0,
    uniqueDonors: 0,
    pendingAmount: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDonations = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

      // Se institutionId for fornecido, filtrar por instituição
      if (institutionId) {
        query = query.eq("institution_id", institutionId);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      const donationsData = data || [];
      setDonations(donationsData);

      // Calcular métricas
      const approvedDonations = donationsData.filter(d => d.payment_status === 'approved');
      const pendingDonations = donationsData.filter(d => d.payment_status === 'pending');
      
      const totalAmount = approvedDonations.reduce((sum, donation) => sum + Number(donation.amount), 0);
      const pendingAmount = pendingDonations.reduce((sum, donation) => sum + Number(donation.amount), 0);
      const uniqueDonors = new Set(donationsData.map(d => d.donor_email).filter(Boolean)).size;

      setMetrics({
        totalAmount,
        totalDonations: approvedDonations.length,
        uniqueDonors,
        pendingAmount
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
  }, [institutionId]);

  return { donations, metrics, loading, refetch: fetchDonations };
};
