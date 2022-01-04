import {UserAccount} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {AccountListAction} from "../actions";

export interface AccountListState {
  loading: boolean,
  params?: any,
  rows?: UserAccount[],
  total?: number,
  error?: AppError
}

const initState: AccountListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveAccount:any=localStorage.getItem('list-account');
const dataAccount:AccountListState = JSON.parse(saveAccount)?JSON.parse(saveAccount):initState

export default (state = dataAccount, {type, total, rows, params, error}: AccountListAction): AccountListState => {
  switch (type) {
    case Actions.GET_LIST_ACCOUNT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_ACCOUNT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_ACCOUNT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
