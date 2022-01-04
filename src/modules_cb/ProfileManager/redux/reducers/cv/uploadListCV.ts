import {UploadListCVRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import { UploadListCVAction} from "../../actions";

export interface UploadListCVState {
  loading: boolean,
  request?: UploadListCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UploadListCVState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UploadListCVAction): UploadListCVState => {
  switch (type) {
    case Actions.UPLOAD_LIST_CV:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPLOAD_LIST_CV_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPLOAD_LIST_CV_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
