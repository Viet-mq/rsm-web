import {UpdateProfileRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {UpdateProfileAction} from "../../actions";

export interface UpdateProfileState {
  loading: boolean,
  request?: UpdateProfileRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateProfileState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateProfileAction): UpdateProfileState => {
  switch (type) {
    case Actions.UPDATE_PROFILE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_PROFILE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
