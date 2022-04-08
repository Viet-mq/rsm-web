import {DeleteCVRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {DeleteCVAction} from "../../actions";

export interface DeleteCVState {
  loading: boolean,
  request?: DeleteCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteCVState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteCVAction): DeleteCVState => {
  switch (type) {
    case Actions.DELETE_CV:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_CV_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_CV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
