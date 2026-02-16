import { API_CONFIG } from "../../config/api";
import type {
  Epp,
  EppTypes,
  PreviousCondition,
  ReasonRequest,
  Sizes,
  Status,
} from "../../types/types";
import { apiClient } from "../client";

class CatalogsService {
  private getEppTypesEndpoint = API_CONFIG.endpoints.catalogs.getEppTypes;
  private getSizesEndpoint = API_CONFIG.endpoints.catalogs.getSizes;
  private getStatusEndpoint = API_CONFIG.endpoints.catalogs.getStatus;
  private getReasonRequestEndpoint =
    API_CONFIG.endpoints.catalogs.getReasonRequest;
  private getPreviousConditionEndpoint =
    API_CONFIG.endpoints.catalogs.getPreviousCondition;
  private getEppEndpoint = API_CONFIG.endpoints.catalogs.getEpp;

  async getEppTypes(): Promise<EppTypes[]> {
    return apiClient.get<EppTypes[]>(this.getEppTypesEndpoint);
  }

  async getSizes(): Promise<Sizes[]> {
    return apiClient.get<Sizes[]>(this.getSizesEndpoint);
  }

  async getStatus(): Promise<Status[]> {
    return apiClient.get<Status[]>(this.getStatusEndpoint);
  }

  async getReasonRequest(): Promise<ReasonRequest[]> {
    return apiClient.get<ReasonRequest[]>(this.getReasonRequestEndpoint);
  }

  async getPreviousCondition(): Promise<PreviousCondition[]> {
    return apiClient.get<PreviousCondition[]>(
      this.getPreviousConditionEndpoint,
    );
  }

  async getEpp(): Promise<Epp[]> {
    return apiClient.get<Epp[]>(this.getEppEndpoint);
  }
}

export const catalogsService = new CatalogsService();
