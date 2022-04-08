import {CompanyEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchCompanyAction} from "../actions";

export interface SearchCompanyState {
  loading: boolean,
  params?: any,
  rows?: CompanyEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SearchCompanyState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchCompanyAction): SearchCompanyState => {
  switch (type) {
    case Actions.GET_SEARCH_COMPANY:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_SEARCH_COMPANY_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_SEARCH_COMPANY_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
