import {AppError} from "src/models/common";
import * as Actions from "../../actions";
import {GroupAPIEntity} from "../../../types";
import {GetListGroupAPIAction} from "../../actions";

export interface GetListGroupAPIState {
  loading: boolean,
  params?: any,
  total?: number,
  rows?: GroupAPIEntity[],
  error?: AppError
}

const initState: GetListGroupAPIState = {
  loading: false,
  total: 0,
  rows: [],
  params: {}
}

export default (state = initState, {
  type,
  total,
  rows,
  params,
  error
}: GetListGroupAPIAction): GetListGroupAPIState => {
  switch (type) {
    case Actions.GET_LIST_GROUP_API:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_GROUP_API_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_GROUP_API_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
