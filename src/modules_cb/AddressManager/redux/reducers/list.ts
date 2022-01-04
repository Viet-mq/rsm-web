import {AddressEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {AddressListAction} from "../actions";

export interface AddressListState {
  loading: boolean,
  params?: any,
  rows?: AddressEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: AddressListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveAddress:any=localStorage.getItem('list-address');
const dataAddress:AddressListState = JSON.parse(saveAddress)?JSON.parse(saveAddress):initState

export default (state = dataAddress, {type, total, rows, params, error}: AddressListAction): AddressListState => {
  switch (type) {
    case Actions.GET_LIST_ADDRESS:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_ADDRESS_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_ADDRESS_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
