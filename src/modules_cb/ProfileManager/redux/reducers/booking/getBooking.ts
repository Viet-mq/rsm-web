import {BookingEntity} from "../../../types";
import {AppError} from "../../../../../models/baseResponse";
import * as Actions from "../../actions";
import {GetBookingAction} from "../../actions";


export interface GetBookingState {
  loading: boolean,
  params?: any,
  result?: BookingEntity,
  error?: AppError
}

const initState: GetBookingState = {
  loading: false,
  params: {},
}

export default (state = initState, {
  type,
  params,
  error,
  result
}: GetBookingAction): GetBookingState => {
  switch (type) {
    case Actions.GET_BOOKING:
      return {
        ...state,
        params,
        loading: false,
      }
    case Actions.GET_BOOKING_SUCCESS:
      return {
        ...state,
        result,
        loading: false
      }
    case Actions.GET_BOOKING_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }

}
