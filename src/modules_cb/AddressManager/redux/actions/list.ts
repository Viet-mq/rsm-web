import {AddressEntity} from "../../types";
import {AppError} from "src/models/common";

export interface AddressListAction {
  type: string,
  params?: any,
  rows?: AddressEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_ADDRESS = "GET_LIST_ADDRESS";
export const GET_LIST_ADDRESS_SUCCESS = "GET_LIST_ADDRESS_SUCCESS";
export const GET_LIST_ADDRESS_ERROR = "GET_LIST_ADDRESS_ERROR";

export const getListAddress = (params: any): AddressListAction => ({
  type: GET_LIST_ADDRESS,
  params
});

export const getListAddressSuccess = (total: number, rows: AddressEntity[]): AddressListAction => ({
  type: GET_LIST_ADDRESS_SUCCESS,
  total,
  rows
});

export const getListAddressError = (error: AppError): AddressListAction => ({
  type: GET_LIST_ADDRESS_ERROR,
  error
});
