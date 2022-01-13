import {DeleteJobRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteJobAction} from "../actions";

export interface DeleteJobState {
  loading: boolean,
  request?: DeleteJobRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteJobState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteJobAction): DeleteJobState => {
  switch (type) {
    case Actions.DELETE_JOB:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_JOB_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_JOB_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
