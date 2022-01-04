import {UpdateStatusCVRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateStatusCVAction} from "../actions";

export interface UpdateStatusCVState {
  loading: boolean,
  request?: UpdateStatusCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateStatusCVState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateStatusCVAction): UpdateStatusCVState => {
  switch (type) {
    case Actions.UPDATE_STATUSCV:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_STATUSCV_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_STATUSCV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
