import { useState } from "react";
import { monthlyReportsService } from "../api/services/MonthlyReportsService";

export const useDownloadReport = () => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const downloadReport = async (
    year: number,
    month: number,
    monthId: string,
  ) => {
    try {
      setLoading(true);
      setDownloading(monthId);
      setError("");
      await monthlyReportsService.generateMonthlyReport(year, month);
    } catch (error: any) {
      console.error("Error al descargar: ", error);
      setError("Error al descargar el reporte");
    } finally {
      setDownloading(null);
      setLoading(false);
    }
  };

  return { downloading, loading, error, downloadReport };
};
