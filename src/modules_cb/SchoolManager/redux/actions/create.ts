import {CreateSchoolRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateSchoolAction {
  type: string,
  request?: CreateSchoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_SCHOOL = "CREATE_SCHOOL";
export const CREATE_SCHOOL_SUCCESS = "CREATE_SCHOOL_SUCCESS";
export const CREATE_SCHOOL_ERROR = "CREATE_SCHOOL_ERROR";

export const createSchool = (request: CreateSchoolRequest): CreateSchoolAction => ({
  type: CREATE_SCHOOL,
  request
});

export const createSchoolSuccess = (response: ResponseBase2): CreateSchoolAction => ({
  type: CREATE_SCHOOL_SUCCESS,
  response
});

export const createSchoolError = (error: AppError): CreateSchoolAction => ({
  type: CREATE_SCHOOL_ERROR,
  error
});
