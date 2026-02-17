import { useEffect, useState } from "react";
import type { Months } from "../types/types";
import { monthlyReportsService } from "../api/services/MonthlyReportsService";

export const useMonths = () => {
  const [months, setMonths] = useState<Months[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await monthlyReportsService.gethMonths();

      setMonths(response);
    } catch (err: any) {
      setError("Error al sincronizar datos con el servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { months, loading, error, refresh: fetchData };
};
