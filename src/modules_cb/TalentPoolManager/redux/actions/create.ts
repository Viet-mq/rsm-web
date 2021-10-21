import {CreateTalentPoolRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateTalentPoolAction {
  type: string,
  request?: CreateTalentPoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_TALENT_POOL = "CREATE_TALENT_POOL";
export const CREATE_TALENT_POOL_SUCCESS = "CREATE_TALENT_POOL_SUCCESS";
export const CREATE_TALENT_POOL_ERROR = "CREATE_TALENT_POOL_ERROR";

export const createTalentPool = (request: CreateTalentPoolRequest): CreateTalentPoolAction => ({
  type: CREATE_TALENT_POOL,
  request
});

export const createTalentPoolSuccess = (response: ResponseBase2): CreateTalentPoolAction => ({
  type: CREATE_TALENT_POOL_SUCCESS,
  response
});

export const createTalentPoolError = (error: AppError): CreateTalentPoolAction => ({
  type: CREATE_TALENT_POOL_ERROR,
  error
});
