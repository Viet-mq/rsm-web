import * as Actions from "../../actions";
import {SHOW_EMAIL_CREATE_FORM, SHOW_EMAIL_UPDATE_FORM, ShowBookingAction} from "../../actions";
import {DataShowBooking} from "../../../types";

export interface BookingState {
  show_booking?: boolean
  data_booking?:DataShowBooking
  show_email_create?:boolean
  show_email_update?:boolean
}

const initState: BookingState = {
  show_booking: false,
  show_email_create: false,
  show_email_update: false,

}

export default (state = initState, {
  type,
  show_booking,
  data_booking,
  show_email_create,
  show_email_update
}: ShowBookingAction): BookingState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_BOOKING:
      return {
        ...state,
        show_booking,
        data_booking,
      }

      case Actions.SHOW_EMAIL_CREATE_FORM:
      return {
        ...state,
        show_email_create
      }

      case Actions.SHOW_EMAIL_UPDATE_FORM:
      return {
        ...state,
        show_email_update
      }
    default:
      return state;
  }
}
