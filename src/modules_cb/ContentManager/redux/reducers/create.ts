import {CreateContentReq} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {CreateContentAction} from "../actions";

export interface CreateContentState {
  loading: boolean,
  params?: CreateContentReq,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateContentState = {
  loading: false,
}

export default (state = initState, {type, params, response, error}: CreateContentAction): CreateContentState => {
  switch (type) {
    case Actions.CREATE_CB_CONTENT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.CREATE_CB_CONTENT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_CB_CONTENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
