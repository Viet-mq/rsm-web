import {TalentPoolEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {TalentPoolListAction} from "../actions";

export interface TalentPoolListState {
  loading: boolean,
  params?: any,
  rows?: TalentPoolEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: TalentPoolListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: TalentPoolListAction): TalentPoolListState => {
  switch (type) {
    case Actions.GET_LIST_TALENT_POOL:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_TALENT_POOL_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_TALENT_POOL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
