export interface Epp {
  id: number;
  name: string;
  area: string;
  position: string;
  shift: string;
  eppType: string;
  size: string;
  requestedQuantity: number;
  previousCondition: string;
  deliveryEPPPrevious: boolean;
  createdAt: string;
}

export interface EppTypes {
  id: number;
  nameType: string;
}

export interface Epp {
  name: string;
  area: string;
  position: string;
  shift: string;
  requestedQuantity: number;
  deliveryEPPPrevious: boolean;
  eppTypeId: number;
  sizeId: number;
  reasonRequestId: number;
  previousConditionId: number;
}

export interface StoreDetail {
  deliveryDate?: string;
  authorizedBy?: string;
  lastDelivery?: string;
  replacementPolicy?: boolean;
  statusId?: number;
  deliveryConfirmation?: boolean;
}

export interface EppDetail {
  id: number;
  name: string;
  area: string;
  position: string;
  shift: string;
  requestedQuantity: number;
  deliveryEPPPrevious: boolean;
  createdAt?: string;

  eppType: string;
  size: string;
  reasonRequest: string;
  previousCondition: string;

  store?: StoreDetail | null;
}

export interface Sizes {
  id: number;
  nameSize: string;
}

export interface ReasonRequest {
  id: number;
  nameReason: string;
}

export interface PreviousCondition {
  id: number;
  nameCondition: string;
}
