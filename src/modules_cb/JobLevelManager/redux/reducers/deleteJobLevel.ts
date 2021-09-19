import {DeleteJobLevelRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteJobLevelAction} from "../actions";

export interface DeleteJobLevelState {
  loading: boolean,
  request?: DeleteJobLevelRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteJobLevelState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteJobLevelAction): DeleteJobLevelState => {
  switch (type) {
    case Actions.DELETE_JOBLEVEL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_JOBLEVEL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_JOBLEVEL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
