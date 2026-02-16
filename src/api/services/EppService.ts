import { API_CONFIG } from "../../config/api";
import type { Epp, EppDetail } from "../../types/types";
import { apiClient } from "../client";

class EppService {
  private getEppDetailsEndpoint = API_CONFIG.endpoints.epp.getEppDetails;
  private createEndpoint = API_CONFIG.endpoints.epp.create;

  async getEppDetails(eppId: number): Promise<EppDetail> {
    const url = `${this.getEppDetailsEndpoint}${eppId}/details`;

    return apiClient.get<EppDetail>(url);
  }

  async create(formData: Epp): Promise<Epp> {
    return apiClient.post<Epp>(this.createEndpoint, formData);
  }
}

export const eppService = new EppService();
