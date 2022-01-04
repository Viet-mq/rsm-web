import {AppError} from "src/models/common";
import {CreateStatusCVRequest} from "../../../StatusCVManager/types";
import {InterviewProcessResponse} from "../../types";

export interface CreateInterviewProcessAction {
  type: string,
  request?: CreateStatusCVRequest,
  response?: InterviewProcessResponse,
  error?: AppError
}

export const CREATE_INTERVIEW_PROCESS = "CREATE_INTERVIEW_PROCESS";
export const CREATE_INTERVIEW_PROCESS_SUCCESS = "CREATE_INTERVIEW_PROCESS_SUCCESS";
export const CREATE_INTERVIEW_PROCESS_ERROR = "CREATE_INTERVIEW_PROCESS_ERROR";

export const createInterviewProcess = (request: CreateStatusCVRequest): CreateInterviewProcessAction => ({
  type: CREATE_INTERVIEW_PROCESS,
  request
});

export const createInterviewProcessSuccess = (response: InterviewProcessResponse): CreateInterviewProcessAction => ({
  type: CREATE_INTERVIEW_PROCESS_SUCCESS,
  response
});

export const createInterviewProcessError = (error: AppError): CreateInterviewProcessAction => ({
  type: CREATE_INTERVIEW_PROCESS_ERROR,
  error
});
