import {CreateRecruitmentRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateRecruitmentAction {
  type: string,
  request?: CreateRecruitmentRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_RECRUITMENT = "CREATE_RECRUITMENT";
export const CREATE_RECRUITMENT_SUCCESS = "CREATE_RECRUITMENT_SUCCESS";
export const CREATE_RECRUITMENT_ERROR = "CREATE_RECRUITMENT_ERROR";

export const createRecruitment = (request: CreateRecruitmentRequest): CreateRecruitmentAction => ({
  type: CREATE_RECRUITMENT,
  request
});

export const createRecruitmentSuccess = (response: ResponseBase2): CreateRecruitmentAction => ({
  type: CREATE_RECRUITMENT_SUCCESS,
  response
});

export const createRecruitmentError = (error: AppError): CreateRecruitmentAction => ({
  type: CREATE_RECRUITMENT_ERROR,
  error
});
