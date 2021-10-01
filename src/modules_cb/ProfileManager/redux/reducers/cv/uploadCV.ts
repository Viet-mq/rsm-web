import {UploadCVRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {UploadCVAction} from "../../actions";

export interface UploadCVState {
  loading: boolean,
  request?: UploadCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UploadCVState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UploadCVAction): UploadCVState => {
  switch (type) {
    case Actions.UPLOADCV:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPLOADCV_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPLOADCV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
