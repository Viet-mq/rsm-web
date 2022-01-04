import {DeleteAddressRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteAddressAction {
  type: string,
  request?: DeleteAddressRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_ADDRESS = "DELETE_ADDRESS";
export const DELETE_ADDRESS_SUCCESS = "DELETE_ADDRESS_SUCCESS";
export const DELETE_ADDRESS_ERROR = "DELETE_ADDRESS_ERROR";

export const deleteAddress = (request: DeleteAddressRequest): DeleteAddressAction => ({
  type: DELETE_ADDRESS,
  request
});

export const deleteAddressSuccess = (response: ResponseBase2): DeleteAddressAction => ({
  type: DELETE_ADDRESS_SUCCESS,
  response
});

export const deleteAddressError = (error: AppError): DeleteAddressAction => ({
  type: DELETE_ADDRESS_ERROR,
  error
});
