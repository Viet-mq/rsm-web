import {UpdateAddressRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateAddressAction {
  type: string,
  request?: UpdateAddressRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const UPDATE_ADDRESS_SUCCESS = "UPDATE_ADDRESS_SUCCESS";
export const UPDATE_ADDRESS_ERROR = "UPDATE_ADDRESS_ERROR";

export const updateAddress = (request: UpdateAddressRequest): UpdateAddressAction => ({
  type: UPDATE_ADDRESS,
  request
});

export const updateAddressSuccess = (response: ResponseBase2): UpdateAddressAction => ({
  type: UPDATE_ADDRESS_SUCCESS,
  response
});

export const updateAddressError = (error: AppError): UpdateAddressAction => ({
  type: UPDATE_ADDRESS_ERROR,
  error
});
