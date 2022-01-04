import {ApiRoleEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {GetListApiRoleAction} from "../actions";

export interface GetListApiRoleState {
  loading: boolean,
  params?: any,
  rows?: ApiRoleEntity[],
  total?: number,
  error?: AppError
}

const initState: GetListApiRoleState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: GetListApiRoleAction): GetListApiRoleState => {
  switch (type) {
    case Actions.GET_LIST_API_ROLE:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_API_ROLE_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_API_ROLE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
