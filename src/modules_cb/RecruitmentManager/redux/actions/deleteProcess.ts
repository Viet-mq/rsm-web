import {DeleteProcessRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteProcessAction {
  type: string,
  request?: DeleteProcessRequest,
  response?: ResponseBase2,
  error?: AppError,
  index?:any
}

export const DELETE_PROCESS = "DELETE_PROCESS";
export const RESET_DELETE_PROCESS_RESPONSE = "RESET_DELETE_PROCESS_RESPONSE";
export const DELETE_PROCESS_SUCCESS = "DELETE_PROCESS_SUCCESS";
export const DELETE_PROCESS_ERROR = "DELETE_PROCESS_ERROR";

export const deleteProcess = (request: DeleteProcessRequest,index:any): DeleteProcessAction => ({
  type: DELETE_PROCESS,
  request,
  index
});

export const deleteProcessSuccess = (response: ResponseBase2): DeleteProcessAction => ({
  type: DELETE_PROCESS_SUCCESS,
  response
});

export const deleteProcessError = (error: AppError): DeleteProcessAction => ({
  type: DELETE_PROCESS_ERROR,
  error
});

export const resetDeleteProcessResponse = (): DeleteProcessAction => ({
  type: RESET_DELETE_PROCESS_RESPONSE,

});
