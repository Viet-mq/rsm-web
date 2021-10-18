import {AssignUserRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../../actions";
import {AssignUserAction} from "../../actions";

export interface AssignUserState {
  loading: boolean,
  request?: AssignUserRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: AssignUserState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: AssignUserAction): AssignUserState => {
  switch (type) {
    case Actions.ASSIGN_USER:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.ASSIGN_USER_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.ASSIGN_USER_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
