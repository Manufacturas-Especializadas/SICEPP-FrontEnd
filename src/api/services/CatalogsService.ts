import { API_CONFIG } from "../../config/api";
import type {
  EppTypes,
  PreviousCondition,
  ReasonRequest,
  Sizes,
} from "../../types/types";
import { apiClient } from "../client";

class CatalogsService {
  private getEppTypesEndpoint = API_CONFIG.endpoints.catalogs.getEppTypes;
  private getSizesEndpoint = API_CONFIG.endpoints.catalogs.getSizes;
  private getReasonRequestEndpoint =
    API_CONFIG.endpoints.catalogs.getReasonRequest;
  private getPreviousConditionEndpoint =
    API_CONFIG.endpoints.catalogs.getPreviousCondition;

  async getEppTypes(): Promise<EppTypes[]> {
    return apiClient.get<EppTypes[]>(this.getEppTypesEndpoint);
  }

  async getSizes(): Promise<Sizes[]> {
    return apiClient.get<Sizes[]>(this.getSizesEndpoint);
  }

  async getReasonRequest(): Promise<ReasonRequest[]> {
    return apiClient.get<ReasonRequest[]>(this.getReasonRequestEndpoint);
  }

  async getPreviousCondition(): Promise<PreviousCondition[]> {
    return apiClient.get<PreviousCondition[]>(
      this.getPreviousConditionEndpoint,
    );
  }
}

export const catalogsService = new CatalogsService();
