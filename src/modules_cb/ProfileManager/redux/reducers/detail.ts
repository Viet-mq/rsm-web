import {DetailProfileRequest} from "../../types";
import {AppError} from "../../../../models/common";
import * as Actions from "../actions";
import {DetailProfileAction} from "../actions";

export interface DetailProfileState {
  loading: boolean,
  params?: any,
  result?: DetailProfileRequest,
  error?: AppError
}

const initState: DetailProfileState = {
  loading: false,
  params: {},
}

export default (state = initState, {type, params, result, error}: DetailProfileAction): DetailProfileState => {
  switch (type) {
    case Actions.GET_DETAIL_PROFILE:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_DETAIL_PROFILE_SUCCESS:
      return {
        ...state,
        result,
        loading: false
      }
    case Actions.GET_DETAIL_PROFILE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
