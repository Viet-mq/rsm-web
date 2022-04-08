import {UpdateAllStatusCVRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateAllStatusCVAction} from "../actions";

export interface UpdateAllStatusCVState {
  loading: boolean,
  request?: UpdateAllStatusCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateAllStatusCVState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateAllStatusCVAction): UpdateAllStatusCVState => {
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
