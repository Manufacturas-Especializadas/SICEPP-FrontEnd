import { API_CONFIG } from "../../config/api";
import type { EppTypes, Sizes } from "../../types/types";
import { apiClient } from "../client";

class CatalogsService {
  private getEppTypesEndpoint = API_CONFIG.endpoints.catalogs.getEppTypes;
  private getSizesEndpoint = API_CONFIG.endpoints.catalogs.getSizes;

  async getEppTypes(): Promise<EppTypes[]> {
    return apiClient.get<EppTypes[]>(this.getEppTypesEndpoint);
  }

  async getSizes(): Promise<Sizes[]> {
    return apiClient.get<Sizes[]>(this.getSizesEndpoint);
  }
}

export const catalogsService = new CatalogsService();
