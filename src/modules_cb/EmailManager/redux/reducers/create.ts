import {CreateJobRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateJobAction} from "../actions";

export interface CreateJobState {
  loading: boolean,
  request?: CreateJobRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateJobState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateJobAction): CreateJobState => {
  switch (type) {
    case Actions.CREATE_JOB:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_JOB_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_JOB_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
