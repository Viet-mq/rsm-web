import {UploadCVRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UploadCVAction {
  type: string,
  request?: UploadCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPLOADCV = " UPLOADCV";
export const UPLOADCV_SUCCESS = " UPLOADCV_SUCCESS";
export const UPLOADCV_ERROR = " UPLOADCV_ERROR";

export const uploadCV = (request: UploadCVRequest): UploadCVAction => ({
  type: UPLOADCV,
  request
});

export const uploadCVSuccess = (response: ResponseBase2): UploadCVAction => ({
  type: UPLOADCV_SUCCESS,
  response
});

export const uploadCVError = (error: AppError): UploadCVAction => ({
  type: UPLOADCV_ERROR,
  error
});




