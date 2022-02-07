import {RecruitmentEntity, UpdateRecruitmentRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateRecruitmentAction {
  type: string,
  request?: UpdateRecruitmentRequest,
  response?: ResponseBase2,
  error?: AppError,
  dataUpdate?:RecruitmentEntity
}

export const UPDATE_RECRUITMENT = "UPDATE_RECRUITMENT";
export const UPDATE_RECRUITMENT_SUCCESS = "UPDATE_RECRUITMENT_SUCCESS";
export const UPDATE_RECRUITMENT_ERROR = "UPDATE_RECRUITMENT_ERROR";
export const GET_DATA_RECRUITMENT_UPDATE = "GET_DATA_RECRUITMENT_UPDATE";

export const updateRecruitment = (request: UpdateRecruitmentRequest): UpdateRecruitmentAction => ({
  type: UPDATE_RECRUITMENT,
  request
});

export const getDataRecruitmentUpdate = (dataUpdate: RecruitmentEntity): UpdateRecruitmentAction => ({
  type: GET_DATA_RECRUITMENT_UPDATE,
  dataUpdate
});

export const updateRecruitmentSuccess = (response: ResponseBase2): UpdateRecruitmentAction => ({
  type: UPDATE_RECRUITMENT_SUCCESS,
  response
});

export const updateRecruitmentError = (error: AppError): UpdateRecruitmentAction => ({
  type: UPDATE_RECRUITMENT_ERROR,
  error
});

