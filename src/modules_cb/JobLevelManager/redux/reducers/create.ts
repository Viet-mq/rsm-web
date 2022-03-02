import {CreateJobLevelRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateJobLevelAction} from "../actions";

export interface CreateJobLevelState {
  loading: boolean,
  request?: CreateJobLevelRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateJobLevelState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateJobLevelAction): CreateJobLevelState => {
  switch (type) {
    case Actions.CREATE_JOB_LEVEL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_JOB_LEVEL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_JOB_LEVEL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
