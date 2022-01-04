import {UploadAvatarRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {UploadAvatarAction} from "../../actions";

export interface UploadAvatarState {
  loading: boolean,
  request?: UploadAvatarRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UploadAvatarState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UploadAvatarAction): UploadAvatarState => {
  switch (type) {
    case Actions.UPLOAD_AVATAR:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPLOAD_AVATAR_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
