import {DepartmentEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchListDepartmentAction {
  type: string,
  params?: any,
  rows?: DepartmentEntity[],
  total?: number,
  error?: AppError
}

export const SEARCH_LIST_DEPARTMENT = "SEARCH_LIST_DEPARTMENT";
export const SEARCH_LIST_DEPARTMENT_SUCCESS = "SEARCH_LIST_DEPARTMENT_SUCCESS";
export const SEARCH_LIST_DEPARTMENT_ERROR = "SEARCH_LIST_DEPARTMENT_ERROR";

export const searchListDepartment = (params: any): SearchListDepartmentAction => ({
  type: SEARCH_LIST_DEPARTMENT,
  params
});

export const searchListDepartmentSuccess = (total: number, rows: DepartmentEntity[]): SearchListDepartmentAction => ({
  type: SEARCH_LIST_DEPARTMENT_SUCCESS,
  total,
  rows
});

export const searchListDepartmentError = (error: AppError): SearchListDepartmentAction => ({
  type: SEARCH_LIST_DEPARTMENT_ERROR,
  error
});
