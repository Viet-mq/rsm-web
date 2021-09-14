import {ApiRoleGroupEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {GetListApiGroupAction} from "../actions";

export interface GetListApiGroupState {
  loading: boolean,
  params?: any,
  rows?: ApiRoleGroupEntity[],
  total?: number,
  error?: AppError
}

const initState: GetListApiGroupState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, params, total, rows, error}: GetListApiGroupAction): GetListApiGroupState => {
  switch (type) {
    case Actions.GET_LIST_API_GROUP_ACTION:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_API_GROUP_ACTION_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_API_GROUP_ACTION_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
