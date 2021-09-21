import {DeleteProfileRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteProfileAction} from "../actions";

export interface DeleteProfileState {
  loading: boolean,
  request?: DeleteProfileRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteProfileState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteProfileAction): DeleteProfileState => {
  switch (type) {
    case Actions.DELETE_PROFILE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_PROFILE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
