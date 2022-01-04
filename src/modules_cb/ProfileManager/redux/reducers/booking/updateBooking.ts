import {UpdateBookingRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {UpdateBookingAction} from "../../actions";

export interface UpdateBookingState {
  loading: boolean,
  request?: UpdateBookingRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateBookingState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateBookingAction): UpdateBookingState => {
  switch (type) {
    case Actions.UPDATE_BOOKING:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_BOOKING_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_BOOKING_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
