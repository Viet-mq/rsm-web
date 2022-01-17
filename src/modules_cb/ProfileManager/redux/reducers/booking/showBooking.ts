import * as Actions from "../../actions";
import {ShowBookingAction} from "../../actions";
import {DataShowBooking} from "../../../types";

export interface BookingState {
  show_booking?: boolean
  data_booking?:DataShowBooking
  show_email?:boolean

}

const initState: BookingState = {
  show_booking: false,
  show_email:false

}

export default (state = initState, {
  type,
  show_booking,
  data_booking,
  show_email
}: ShowBookingAction): BookingState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_BOOKING:
      return {
        ...state,
        show_booking,
        data_booking,
      }

      case Actions.SHOW_EMAIL_FORM:
      return {
        ...state,
        show_email
      }
    default:
      return state;
  }
}
