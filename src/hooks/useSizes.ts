import { useEffect, useState } from "react";
import type { Sizes } from "../types/types";
import { catalogsService } from "../api/services/CatalogsService";

export const useSizes = () => {
  const [data, setData] = useState<Sizes[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await catalogsService.getSizes();

      setData(response);
    } catch (err) {
      setError("Error al sincronizar datos con el servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refresh: fetchData };
};
