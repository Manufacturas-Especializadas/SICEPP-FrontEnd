import { API_CONFIG } from "../../config/api";
import type { StoreForm } from "../../types/types";
import { apiClient } from "../client";

class StoreService {
  private createEndpoint = API_CONFIG.endpoints.store.create;

  async create(formData: StoreForm): Promise<StoreForm> {
    return apiClient.post(this.createEndpoint, formData);
  }
}

export const storeService = new StoreService();
