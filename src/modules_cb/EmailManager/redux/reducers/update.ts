import {UpdateJobRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateJobAction} from "../actions";

export interface UpdateJobState {
  loading: boolean,
  request?: UpdateJobRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateJobState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateJobAction): UpdateJobState => {
  switch (type) {
    case Actions.UPDATE_JOB:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_JOB_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_JOB_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
