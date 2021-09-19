import {UpdateDepartmentRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateDepartmentAction {
  type: string,
  request?: UpdateDepartmentRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_DEPARTMENT = "UPDATE_DEPARTMENT";
export const UPDATE_DEPARTMENT_SUCCESS = "UPDATE_DEPARTMENT_SUCCESS";
export const UPDATE_DEPARTMENT_ERROR = "UPDATE_DEPARTMENT_ERROR";

export const updateDepartment = (request: UpdateDepartmentRequest): UpdateDepartmentAction => ({
  type: UPDATE_DEPARTMENT,
  request
});

export const updateDepartmentSuccess = (response: ResponseBase2): UpdateDepartmentAction => ({
  type: UPDATE_DEPARTMENT_SUCCESS,
  response
});

export const updateDepartmentError = (error: AppError): UpdateDepartmentAction => ({
  type: UPDATE_DEPARTMENT_ERROR,
  error
});
