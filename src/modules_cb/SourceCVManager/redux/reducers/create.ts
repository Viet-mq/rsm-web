import {CreateSourceCVRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateSourceCVAction} from "../actions";

export interface CreateSourceCVState {
  loading: boolean,
  request?: CreateSourceCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateSourceCVState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateSourceCVAction): CreateSourceCVState => {
  switch (type) {
    case Actions.CREATE_SOURCECV:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_SOURCECV_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_SOURCECV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
