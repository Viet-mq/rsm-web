import {ViewRolesEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {ViewRolesListAction} from "../actions";

export interface ViewRolesListState {
  loading: boolean,
  params?: any,
  rows?: ViewRolesEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: ViewRolesListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveViewRoles:any=localStorage.getItem('list-view-roles');
const dataViewRoles:ViewRolesListState = JSON.parse(saveViewRoles)?JSON.parse(saveViewRoles):initState

export default (state = dataViewRoles, {type, total, rows, params, error}: ViewRolesListAction): ViewRolesListState => {
  switch (type) {
    case Actions.GET_LIST_VIEW_ROLES:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_VIEW_ROLES_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_VIEW_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
