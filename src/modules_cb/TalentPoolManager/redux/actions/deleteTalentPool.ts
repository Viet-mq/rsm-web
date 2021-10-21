import {DeleteTalentPoolRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteTalentPoolAction {
  type: string,
  request?: DeleteTalentPoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_TALENT_POOL = "DELETE_TALENT_POOL";
export const DELETE_TALENT_POOL_SUCCESS = "DELETE_TALENT_POOL_SUCCESS";
export const DELETE_TALENT_POOL_ERROR = "DELETE_TALENT_POOL_ERROR";

export const deleteTalentPool = (request: DeleteTalentPoolRequest): DeleteTalentPoolAction => ({
  type: DELETE_TALENT_POOL,
  request
});

export const deleteTalentPoolSuccess = (response: ResponseBase2): DeleteTalentPoolAction => ({
  type: DELETE_TALENT_POOL_SUCCESS,
  response
});

export const deleteTalentPoolError = (error: AppError): DeleteTalentPoolAction => ({
  type: DELETE_TALENT_POOL_ERROR,
  error
});
