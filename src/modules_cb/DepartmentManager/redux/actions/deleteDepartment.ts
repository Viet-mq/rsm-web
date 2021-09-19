import {DeleteDepartmentRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteDepartmentAction {
  type: string,
  request?: DeleteDepartmentRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_DEPARTMENT = "DELETE_DEPARTMENT";
export const DELETE_DEPARTMENT_SUCCESS = "DELETE_DEPARTMENT_SUCCESS";
export const DELETE_DEPARTMENT_ERROR = "DELETE_DEPARTMENT_ERROR";

export const deleteDepartment = (request: DeleteDepartmentRequest): DeleteDepartmentAction => ({
  type: DELETE_DEPARTMENT,
  request
});

export const deleteDepartmentSuccess = (response: ResponseBase2): DeleteDepartmentAction => ({
  type: DELETE_DEPARTMENT_SUCCESS,
  response
});

export const deleteDepartmentError = (error: AppError): DeleteDepartmentAction => ({
  type: DELETE_DEPARTMENT_ERROR,
  error
});
