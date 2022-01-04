import {UpdateJobLevelRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateJobLevelAction} from "../actions";

export interface UpdateJobLevelState {
  loading: boolean,
  request?: UpdateJobLevelRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateJobLevelState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateJobLevelAction): UpdateJobLevelState => {
  switch (type) {
    case Actions.UPDATE_JOBLEVEL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_JOBLEVEL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_JOBLEVEL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
