import {APIRolesEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {APIRolesListAction} from "../actions";

export interface APIRolesListState {
  loading: boolean,
  params?: any,
  rows?: APIRolesEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: APIRolesListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveAPIRoles:any=localStorage.getItem('list-api-roles');
const dataAPIRoles:APIRolesListState = JSON.parse(saveAPIRoles)?JSON.parse(saveAPIRoles):initState

export default (state = dataAPIRoles, {type, total, rows, params, error}: APIRolesListAction): APIRolesListState => {
  switch (type) {
    case Actions.GET_LIST_API_ROLES:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_API_ROLES_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_API_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
