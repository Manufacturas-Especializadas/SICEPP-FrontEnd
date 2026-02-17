import { API_CONFIG } from "../../config/api";
import type { Months } from "../../types/types";
import { apiClient } from "../client";

class MonthlyReportsService {
  private gethMonthsEndpoint = API_CONFIG.endpoints.monthlyReport.getMonths;

  async gethMonths(): Promise<Months[]> {
    return apiClient.get<Months[]>(this.gethMonthsEndpoint);
  }
}

export const monthlyReportsService = new MonthlyReportsService();
