import {DeleteAddressRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteAddressAction} from "../actions";

export interface DeleteAddressState {
  loading: boolean,
  request?: DeleteAddressRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteAddressState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteAddressAction): DeleteAddressState => {
  switch (type) {
    case Actions.DELETE_ADDRESS:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_ADDRESS_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
