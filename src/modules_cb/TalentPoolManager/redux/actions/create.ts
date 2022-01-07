import {CreateTalentPoolRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateTalentPoolAction {
  type: string,
  request?: CreateTalentPoolRequest,
  response?: ResponseBase2,
  error?: AppError,
  title?:string
}

export const CREATE_TALENT_POOL = "CREATE_TALENT_POOL";
export const CREATE_TALENT_POOL_SUCCESS = "CREATE_TALENT_POOL_SUCCESS";
export const CREATE_TALENT_POOL_ERROR = "CREATE_TALENT_POOL_ERROR";
export const SET_TITLE_TALENT_POOLS = "SET_TITLE_TALENT_POOLS";

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
export const setTittleTalentPools = (title: string): CreateTalentPoolAction => ({
  type: SET_TITLE_TALENT_POOLS,
  title
});
