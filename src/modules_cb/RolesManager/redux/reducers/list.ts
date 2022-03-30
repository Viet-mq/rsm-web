import {RolesEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {RolesListAction} from "../actions";

export interface RolesListState {
  loading: boolean,
  params?: any,
  rows?: RolesEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: RolesListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveRoles:any=localStorage.getItem('list-roles');
const dataRoles:RolesListState = JSON.parse(saveRoles)?JSON.parse(saveRoles):initState

export default (state = dataRoles, {type, total, rows, params, error}: RolesListAction): RolesListState => {
  switch (type) {
    case Actions.GET_LIST_ROLES:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_ROLES_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
