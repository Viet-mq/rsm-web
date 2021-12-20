import {DeleteRecruitmentRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteRecruitmentAction {
  type: string,
  request?: DeleteRecruitmentRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_RECRUITMENT = "DELETE_RECRUITMENT";
export const DELETE_RECRUITMENT_SUCCESS = "DELETE_RECRUITMENT_SUCCESS";
export const DELETE_RECRUITMENT_ERROR = "DELETE_RECRUITMENT_ERROR";

export const deleteRecruitment = (request: DeleteRecruitmentRequest): DeleteRecruitmentAction => ({
  type: DELETE_RECRUITMENT,
  request
});

export const deleteRecruitmentSuccess = (response: ResponseBase2): DeleteRecruitmentAction => ({
  type: DELETE_RECRUITMENT_SUCCESS,
  response
});

export const deleteRecruitmentError = (error: AppError): DeleteRecruitmentAction => ({
  type: DELETE_RECRUITMENT_ERROR,
  error
});
