import {AppError} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateInterviewProcessAction} from "../actions";
import {CreateStatusCVRequest} from "../../../StatusCVManager/types";
import {InterviewProcessResponse} from "../../types";

export interface CreateInterviewProcessState {
  loading: boolean,
  request?: CreateStatusCVRequest,
  response?: InterviewProcessResponse,
  error?: AppError
}

const initState: CreateInterviewProcessState = {
  loading: false,

}

export default (state = initState, {
  type,
  request,
  response,
  error
}: CreateInterviewProcessAction): CreateInterviewProcessState => {
  switch (type) {
    case Actions.CREATE_INTERVIEW_PROCESS:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_INTERVIEW_PROCESS_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_INTERVIEW_PROCESS_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
