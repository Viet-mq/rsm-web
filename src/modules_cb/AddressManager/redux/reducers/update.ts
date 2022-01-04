import {UpdateAddressRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateAddressAction} from "../actions";

export interface UpdateAddressState {
  loading: boolean,
  request?: UpdateAddressRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateAddressState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateAddressAction): UpdateAddressState => {
  switch (type) {
    case Actions.UPDATE_ADDRESS:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_ADDRESS_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
