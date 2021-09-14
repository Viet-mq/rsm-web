export interface RC {
  code: number;
  desc: string;
}

export interface ResponseBase {
  rc: RC; // old, need remove
}

export interface ResponseBase2 {
  code: number,
  message: string
}

export interface ListResponseBase2<T> extends ResponseBase2 {
  rows: T[];
  total: number;
}

export interface ListResponseBase<T> extends ResponseBase {
  total: number;
  rows: T[];
  camera_area_type?: number;
}

export interface ListResponseBases<T> extends ResponseBase {
  result: T[];
}

export interface ItemResponseBase<T> extends ResponseBase {
  item: T;
}

// actions base for redux actions
export interface ActionBase<T> {
  type: string;
  params?: any;
  payload?: T;
  error?: AppError;
  id?: string;
}

export interface DeleteInput {
  id: string;
}

export class AppError extends Error {
  code = 0;

  constructor(message: string, code: number = 0) {
    super(message);
    this.code = code;
  }
}
