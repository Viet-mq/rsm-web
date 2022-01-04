import {UpdateSchoolRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateSchoolAction {
  type: string,
  request?: UpdateSchoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_SCHOOL = "UPDATE_SCHOOL";
export const UPDATE_SCHOOL_SUCCESS = "UPDATE_SCHOOL_SUCCESS";
export const UPDATE_SCHOOL_ERROR = "UPDATE_SCHOOL_ERROR";

export const updateSchool = (request: UpdateSchoolRequest): UpdateSchoolAction => ({
  type: UPDATE_SCHOOL,
  request
});

export const updateSchoolSuccess = (response: ResponseBase2): UpdateSchoolAction => ({
  type: UPDATE_SCHOOL_SUCCESS,
  response
});

export const updateSchoolError = (error: AppError): UpdateSchoolAction => ({
  type: UPDATE_SCHOOL_ERROR,
  error
});
