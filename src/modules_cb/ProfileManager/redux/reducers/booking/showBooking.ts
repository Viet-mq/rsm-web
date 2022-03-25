import * as Actions from "../../actions";
import {ShowBookingAction} from "../../actions";
import {BookingEntity, DataShowBooking} from "../../../types";

export interface BookingState {
  show_booking?: boolean
  data_booking?: DataShowBooking
  data_update_booking?:any,
  show_email_create?: boolean
  show_interview_email_create?: boolean
  show_email_update?: boolean
  is_update?: boolean
}

const initState: BookingState = {
  show_booking: false,
  show_email_create: false,
  show_interview_email_create: false,
  show_email_update: false,
  is_update: false
}

export default (state = initState, {
  type,
  show_booking,
  data_booking,
  data_update_booking,
  show_email_create,
  show_email_update,
  show_interview_email_create,
  is_update
}: ShowBookingAction): BookingState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_BOOKING:
      return {
        ...state,
        show_booking,
        data_booking,
        data_update_booking,
        is_update,
      }

    case Actions.SHOW_EMAIL_CREATE_FORM:
      return {
        ...state,
        show_email_create
      }

    case Actions.SHOW_INTERVIEW_EMAIL_CREATE_FORM:
      return {
        ...state,
        show_interview_email_create
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
