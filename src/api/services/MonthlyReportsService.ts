import { API_CONFIG } from "../../config/api";
import type { Months, ReportRequest } from "../../types/types";
import { apiClient } from "../client";

class MonthlyReportsService {
  private gethMonthsEndpoint = API_CONFIG.endpoints.monthlyReport.getMonths;

  private generateMonthlyReportEndpoint =
    API_CONFIG.endpoints.monthlyReport.generateMonthlyReport;

  async gethMonths(): Promise<Months[]> {
    return apiClient.get<Months[]>(this.gethMonthsEndpoint);
  }

  async generateMonthlyReport(year: number, month: number): Promise<void> {
    const requestData: ReportRequest = { year, month };
    const monthName = new Date(year, month - 1).toLocaleString("es-Mx", {
      month: "long",
    });
    const fileName = `Reporte_${monthName}_${year}.xlsx`;

    await apiClient.downloadFile(
      this.generateMonthlyReportEndpoint,
      fileName,
      requestData,
    );
  }
}

export const monthlyReportsService = new MonthlyReportsService();
