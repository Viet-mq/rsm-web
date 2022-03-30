import {ApiEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {GetListApiAction} from "../actions";

export interface GetListApiState {
  loading: boolean,
  params?: any,
  rows?: ApiEntity[]|any,
  total?: number|any,
  error?: AppError
}

const initState: GetListApiState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveApi:any=localStorage.getItem('list-api');
const dataApi:GetListApiState = JSON.parse(saveApi)?JSON.parse(saveApi):initState


export default (state = dataApi, {type, total, rows, params, error}: GetListApiAction): GetListApiState => {
  switch (type) {
    case Actions.GET_LIST_API:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_API_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_API_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
