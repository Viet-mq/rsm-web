import {SchoolEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SchoolListAction {
  type: string,
  params?: any,
  rows?: SchoolEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_SCHOOL = "GET_LIST_SCHOOL";
export const GET_LIST_SCHOOL_SUCCESS = "GET_LIST_SCHOOL_SUCCESS";
export const GET_LIST_SCHOOL_ERROR = "GET_LIST_SCHOOL_ERROR";

export const getListSchool = (params: any): SchoolListAction => ({
  type: GET_LIST_SCHOOL,
  params
});

export const getListSchoolSuccess = (total: number, rows: SchoolEntity[]): SchoolListAction => ({
  type: GET_LIST_SCHOOL_SUCCESS,
  total,
  rows
});

export const getListSchoolError = (error: AppError): SchoolListAction => ({
  type: GET_LIST_SCHOOL_ERROR,
  error
});
