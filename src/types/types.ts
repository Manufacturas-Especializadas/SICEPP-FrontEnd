export type StatusType = "Pendiente autorizacion" | "Aprobado" | "Rechazado";

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
  status: string;
  requestedQuantity: number;
  deliveryEPPPrevious: boolean;
  eppTypeId: number;
  sizeId: number;
  reasonRequestId: number;
  previousConditionId: number;
}

export interface StoreForm {
  eppId: number;
  deliveryDate: string;
  authorizedBy: string;
  lastDelivery: string;
  replacementPolicy: boolean | null;
  statusId: number;
  deliveryConfirmation: boolean | null;
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

export interface EppListItem {
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
  status: StatusType;
}

export interface CreateEpp {
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

export interface Status {
  id: number;
  nameStatus: string;
}

export interface Months {
  year: number;
  month: number;
  monthName: string;
  description: string;
}
