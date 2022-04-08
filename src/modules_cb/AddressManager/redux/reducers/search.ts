import {AddressEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchListAddressAction} from "../actions";

export interface SearchListAddressState {
  loading: boolean,
  params?: any,
  rows?: AddressEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SearchListAddressState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: SearchListAddressAction): SearchListAddressState => {
  switch (type) {
    case Actions.SEARCH_LIST_ADDRESS:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.SEARCH_LIST_ADDRESS_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.SEARCH_LIST_ADDRESS_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
