import {ProfileEntity} from "../../../types";
import {AppError} from "src/models/common";
import * as Actions from "../../actions";
import {ProfileListAction} from "../../actions";

export interface ProfileListState {
  loading: boolean,
  params?: any,
  rows?: ProfileEntity[],
  total?: number,
  error?: AppError
}

const initState: ProfileListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: ProfileListAction): ProfileListState => {
  switch (type) {
    case Actions.GET_LIST_PROFILE:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_PROFILE_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_PROFILE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
