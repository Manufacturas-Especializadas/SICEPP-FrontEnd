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
