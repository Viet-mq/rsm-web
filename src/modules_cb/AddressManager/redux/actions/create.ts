import {CreateAddressRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateAddressAction {
  type: string,
  request?: CreateAddressRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_ADDRESS = "CREATE_ADDRESS";
export const CREATE_ADDRESS_SUCCESS = "CREATE_ADDRESS_SUCCESS";
export const CREATE_ADDRESS_ERROR = "CREATE_ADDRESS_ERROR";

export const createAddress = (request: CreateAddressRequest): CreateAddressAction => ({
  type: CREATE_ADDRESS,
  request
});

export const createAddressSuccess = (response: ResponseBase2): CreateAddressAction => ({
  type: CREATE_ADDRESS_SUCCESS,
  response
});

export const createAddressError = (error: AppError): CreateAddressAction => ({
  type: CREATE_ADDRESS_ERROR,
  error
});
