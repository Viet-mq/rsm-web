import {SchoolEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchSchoolAction {
  type: string,
  params?: any,
  rows?: SchoolEntity[],
  total?: number,
  error?: AppError
}

export const GET_SEARCH_SCHOOL = "GET_SEARCH_SCHOOL";
export const GET_SEARCH_SCHOOL_SUCCESS = "GET_SEARCH_SCHOOL_SUCCESS";
export const GET_SEARCH_SCHOOL_ERROR = "GET_SEARCH_SCHOOL_ERROR";

export const getSearchSchool = (params: any): SearchSchoolAction => ({
  type: GET_SEARCH_SCHOOL,
  params
});

export const getSearchSchoolSuccess = (total: number, rows: SchoolEntity[]): SearchSchoolAction => ({
  type: GET_SEARCH_SCHOOL_SUCCESS,
  total,
  rows
});

export const getSearchSchoolError = (error: AppError): SearchSchoolAction => ({
  type: GET_SEARCH_SCHOOL_ERROR,
  error
});
