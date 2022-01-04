import {DepartmentEntity} from "../../types";
import {AppError} from "src/models/common";

export interface DepartmentListAction {
  type: string,
  params?: any,
  rows?: DepartmentEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_DEPARTMENT = "GET_LIST_DEPARTMENT";
export const GET_LIST_DEPARTMENT_SUCCESS = "GET_LIST_DEPARTMENT_SUCCESS";
export const GET_LIST_DEPARTMENT_ERROR = "GET_LIST_DEPARTMENT_ERROR";

export const getListDepartment = (params: any): DepartmentListAction => ({
  type: GET_LIST_DEPARTMENT,
  params
});

export const getListDepartmentSuccess = (total: number, rows: DepartmentEntity[]): DepartmentListAction => ({
  type: GET_LIST_DEPARTMENT_SUCCESS,
  total,
  rows
});

export const getListDepartmentError = (error: AppError): DepartmentListAction => ({
  type: GET_LIST_DEPARTMENT_ERROR,
  error
});
