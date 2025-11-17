import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function usePaginatedDonations(institutionId?: string, page = 1, limit = 10) {
  const [donations, setDonations] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!institutionId) return;

    const fetchPage = async () => {
      setLoading(true);

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from("donations")
        .select("*", { count: "exact" })
        .eq("institution_id", institutionId)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) console.error(error);

      setDonations(data || []);
      setTotalCount(count || 0);
      setLoading(false);
    };

    fetchPage();
  }, [institutionId, page, limit]);

  return { donations, loading, totalCount };
}
