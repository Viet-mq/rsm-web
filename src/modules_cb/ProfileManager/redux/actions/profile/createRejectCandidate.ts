
import {AppError, ResponseBase2} from "src/models/common";
import {CreateRejectCandidateRequest} from "../../../types";

export interface CreateRejectCandidateAction {
  type: string,
  request?: CreateRejectCandidateRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_REJECT_CANDIDATE = "CREATE_REJECT_CANDIDATE";
export const CREATE_REJECT_CANDIDATE_SUCCESS = "CREATE_REJECT_CANDIDATE_SUCCESS";
export const CREATE_REJECT_CANDIDATE_ERROR = "CREATE_REJECT_CANDIDATE_ERROR";

export const createRejectCandidate = (request: CreateRejectCandidateRequest): CreateRejectCandidateAction => ({
  type: CREATE_REJECT_CANDIDATE,
  request
});

export const createRejectCandidateSuccess = (response: ResponseBase2): CreateRejectCandidateAction => ({
  type: CREATE_REJECT_CANDIDATE_SUCCESS,
  response
});

export const createRejectCandidateError = (error: AppError): CreateRejectCandidateAction => ({
  type: CREATE_REJECT_CANDIDATE_ERROR,
  error
});
