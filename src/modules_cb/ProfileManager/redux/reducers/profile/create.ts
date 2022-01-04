import {CreateProfileRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {CreateProfileAction} from "../../actions";

export interface CreateProfileState {
  loading: boolean,
  request?: CreateProfileRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateProfileState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateProfileAction): CreateProfileState => {
  switch (type) {
    case Actions.CREATE_PROFILE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_PROFILE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
