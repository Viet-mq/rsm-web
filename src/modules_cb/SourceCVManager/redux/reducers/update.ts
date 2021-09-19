import {UpdateSourceCVRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateSourceCVAction} from "../actions";

export interface UpdateSourceCVState {
  loading: boolean,
  request?: UpdateSourceCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateSourceCVState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateSourceCVAction): UpdateSourceCVState => {
  switch (type) {
    case Actions.UPDATE_SOURCECV:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_SOURCECV_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_SOURCECV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
