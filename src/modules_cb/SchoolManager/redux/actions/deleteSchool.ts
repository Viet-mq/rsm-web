import {DeleteSchoolRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteSchoolAction {
  type: string,
  request?: DeleteSchoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_SCHOOL = "DELETE_SCHOOL";
export const DELETE_SCHOOL_SUCCESS = "DELETE_SCHOOL_SUCCESS";
export const DELETE_SCHOOL_ERROR = "DELETE_SCHOOL_ERROR";

export const deleteSchool = (request: DeleteSchoolRequest): DeleteSchoolAction => ({
  type: DELETE_SCHOOL,
  request
});

export const deleteSchoolSuccess = (response: ResponseBase2): DeleteSchoolAction => ({
  type: DELETE_SCHOOL_SUCCESS,
  response
});

export const deleteSchoolError = (error: AppError): DeleteSchoolAction => ({
  type: DELETE_SCHOOL_ERROR,
  error
});
