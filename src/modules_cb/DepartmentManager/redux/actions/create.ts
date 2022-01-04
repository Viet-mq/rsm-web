import {CreateDepartmentRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateDepartmentAction {
  type: string,
  request?: CreateDepartmentRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_DEPARTMENT = "CREATE_DEPARTMENT";
export const CREATE_DEPARTMENT_SUCCESS = "CREATE_DEPARTMENT_SUCCESS";
export const CREATE_DEPARTMENT_ERROR = "CREATE_DEPARTMENT_ERROR";

export const createDepartment = (request: CreateDepartmentRequest): CreateDepartmentAction => ({
  type: CREATE_DEPARTMENT,
  request
});

export const createDepartmentSuccess = (response: ResponseBase2): CreateDepartmentAction => ({
  type: CREATE_DEPARTMENT_SUCCESS,
  response
});

export const createDepartmentError = (error: AppError): CreateDepartmentAction => ({
  type: CREATE_DEPARTMENT_ERROR,
  error
});
