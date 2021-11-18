import {CreateAddressRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateAddressAction} from "../actions";

export interface CreateAddressState {
  loading: boolean,
  request?: CreateAddressRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateAddressState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateAddressAction): CreateAddressState => {
  switch (type) {
    case Actions.CREATE_ADDRESS:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_ADDRESS_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
