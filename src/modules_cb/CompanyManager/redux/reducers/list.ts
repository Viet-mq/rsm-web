import {CompanyEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {CompanyListAction} from "../actions";

export interface CompanyListState {
  loading: boolean,
  params?: any,
  rows?: CompanyEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: CompanyListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveCompany:any=localStorage.getItem('list-company');
const dataCompany:CompanyListState = JSON.parse(saveCompany)?JSON.parse(saveCompany):initState

export default (state = dataCompany, {type, total, rows, params, error}: CompanyListAction): CompanyListState => {
  switch (type) {
    case Actions.GET_LIST_COMPANY:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_COMPANY_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_COMPANY_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
