import { useEffect, useState } from "react";
import type { EppDetail } from "../types/types";
import { eppService } from "../api/services/EppService";

export const useEppDetails = (eppId: number | null) => {
  const [data, setData] = useState<EppDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eppId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await eppService.getEppDetails(eppId);

        setData(result);
      } catch (err) {
        setError("Error loading details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [eppId]);

  return { data, loading, error };
};
