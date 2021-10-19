import {UploadListCVRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UploadListCVAction {
  type: string,
  request?: UploadListCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPLOAD_LIST_CV = " UPLOAD_LIST_CV";
export const UPLOAD_LIST_CV_SUCCESS = " UPLOAD_LIST_CV_SUCCESS";
export const UPLOAD_LIST_CV_ERROR = " UPLOAD_LIST_CV_ERROR";

export const uploadListCV = (request: UploadListCVRequest): UploadListCVAction => ({
  type: UPLOAD_LIST_CV,
  request
});

export const uploadListCVSuccess = (response: ResponseBase2): UploadListCVAction => ({
  type: UPLOAD_LIST_CV_SUCCESS,
  response
});

export const uploadListCVError = (error: AppError): UploadListCVAction => ({
  type: UPLOAD_LIST_CV_ERROR,
  error
});




