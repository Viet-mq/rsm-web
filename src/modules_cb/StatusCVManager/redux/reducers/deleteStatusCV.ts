import {DeleteStatusCVRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteStatusCVAction} from "../actions";

export interface DeleteStatusCVState {
  loading: boolean,
  request?: DeleteStatusCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteStatusCVState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteStatusCVAction): DeleteStatusCVState => {
  switch (type) {
    case Actions.DELETE_STATUSCV:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_STATUSCV_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_STATUSCV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
