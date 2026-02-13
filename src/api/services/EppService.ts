import { API_CONFIG } from "../../config/api";
import type { Epp } from "../../types/types";
import { apiClient } from "../client";

class EppService {
  private createEndpoint = API_CONFIG.endpoints.epp.create;

  async create(formData: Epp): Promise<Epp> {
    return apiClient.post<Epp>(this.createEndpoint, formData);
  }
}

export const eppService = new EppService();
