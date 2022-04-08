import {AddressEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchListAddressAction {
  type: string,
  params?: any,
  rows?: AddressEntity[],
  total?: number,
  error?: AppError
}

export const SEARCH_LIST_ADDRESS = "SEARCH_LIST_ADDRESS";
export const SEARCH_LIST_ADDRESS_SUCCESS = "SEARCH_LIST_ADDRESS_SUCCESS";
export const SEARCH_LIST_ADDRESS_ERROR = "SEARCH_LIST_ADDRESS_ERROR";

export const searchListAddress = (params: any): SearchListAddressAction => ({
  type: SEARCH_LIST_ADDRESS,
  params
});

export const searchListAddressSuccess = (total: number, rows: AddressEntity[]): SearchListAddressAction => ({
  type: SEARCH_LIST_ADDRESS_SUCCESS,
  total,
  rows
});

export const searchListAddressError = (error: AppError): SearchListAddressAction => ({
  type: SEARCH_LIST_ADDRESS_ERROR,
  error
});
