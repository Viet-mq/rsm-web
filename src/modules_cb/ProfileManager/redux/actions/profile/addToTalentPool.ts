import {AddToTalentPoolRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface AddToTalentPoolAction {
  type: string,
  request?: AddToTalentPoolRequest,
  response?: ResponseBase2,
  error?: AppError,
}

export const ADD_TO_TALENT_POOL = "ADD_TO_TALENT_POOL";
export const ADD_TO_TALENT_POOL_SUCCESS = "ADD_TO_TALENT_POOL_SUCCESS";
export const ADD_TO_TALENT_POOL_ERROR = "ADD_TO_TALENT_POOL_ERROR";

export const addToTalentPool = (request: AddToTalentPoolRequest): AddToTalentPoolAction => ({
  type: ADD_TO_TALENT_POOL,
  request,
});

export const addToTalentPoolSuccess = (response: ResponseBase2): AddToTalentPoolAction => ({
  type: ADD_TO_TALENT_POOL_SUCCESS,
  response
});

export const addToTalentPoolError = (error: AppError): AddToTalentPoolAction => ({
  type: ADD_TO_TALENT_POOL_ERROR,
  error
});
