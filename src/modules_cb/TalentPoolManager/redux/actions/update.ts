import {UpdateTalentPoolRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateTalentPoolAction {
  type: string,
  request?: UpdateTalentPoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_TALENT_POOL = "UPDATE_TALENT_POOL";
export const UPDATE_TALENT_POOL_SUCCESS = "UPDATE_TALENT_POOL_SUCCESS";
export const UPDATE_TALENT_POOL_ERROR = "UPDATE_TALENT_POOL_ERROR";

export const updateTalentPool = (request: UpdateTalentPoolRequest): UpdateTalentPoolAction => ({
  type: UPDATE_TALENT_POOL,
  request
});

export const updateTalentPoolSuccess = (response: ResponseBase2): UpdateTalentPoolAction => ({
  type: UPDATE_TALENT_POOL_SUCCESS,
  response
});

export const updateTalentPoolError = (error: AppError): UpdateTalentPoolAction => ({
  type: UPDATE_TALENT_POOL_ERROR,
  error
});
