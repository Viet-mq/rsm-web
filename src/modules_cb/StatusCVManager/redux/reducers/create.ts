import {CreateStatusCVRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateStatusCVAction} from "../actions";

export interface CreateStatusCVState {
  loading: boolean,
  request?: CreateStatusCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateStatusCVState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateStatusCVAction): CreateStatusCVState => {
  switch (type) {
    case Actions.CREATE_STATUSCV:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_STATUSCV_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_STATUSCV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
