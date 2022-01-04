import {DeleteSourceCVRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteSourceCVAction} from "../actions";

export interface DeleteSourceCVState {
  loading: boolean,
  request?: DeleteSourceCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteSourceCVState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteSourceCVAction): DeleteSourceCVState => {
  switch (type) {
    case Actions.DELETE_SOURCECV:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_SOURCECV_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_SOURCECV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
