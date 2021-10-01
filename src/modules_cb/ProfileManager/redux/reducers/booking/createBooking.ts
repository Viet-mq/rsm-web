import {CreateBookingRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {CreateBookingAction} from "../../actions";

export interface CreateBookingState {
  loading: boolean,
  request?: CreateBookingRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateBookingState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateBookingAction): CreateBookingState => {
  switch (type) {
    case Actions.CREATE_BOOKING:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_BOOKING_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
