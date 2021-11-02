import {UploadAvatarRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UploadAvatarAction {
  type: string,
  request?: UploadAvatarRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPLOAD_AVATAR = " UPLOAD_AVATAR";
export const UPLOAD_AVATAR_SUCCESS = " UPLOAD_AVATAR_SUCCESS";
export const UPLOAD_AVATAR_ERROR = " UPLOAD_AVATAR_ERROR";

export const uploadAvatar = (request: UploadAvatarRequest): UploadAvatarAction => ({
  type: UPLOAD_AVATAR,
  request
});

export const uploadAvatarSuccess = (response: ResponseBase2): UploadAvatarAction => ({
  type: UPLOAD_AVATAR_SUCCESS,
  response
});

export const uploadAvatarError = (error: AppError): UploadAvatarAction => ({
  type: UPLOAD_AVATAR_ERROR,
  error
});




