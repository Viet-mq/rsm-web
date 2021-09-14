import {ChatBotContent} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {ListContentAction} from "../actions";

export interface ListContentState {
  loading: boolean,
  params?: any,
  total?: number,
  rows?: ChatBotContent[],
  error?: AppError
}

const initState: ListContentState = {
  loading: false,
  rows: [],
  total: 0,
  params: {}
}

export default (state = initState, {type, params, total, rows, error}: ListContentAction): ListContentState => {
  switch (type) {
    case Actions.GET_CB_CONTENT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_CB_CONTENT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_CB_CONTENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
