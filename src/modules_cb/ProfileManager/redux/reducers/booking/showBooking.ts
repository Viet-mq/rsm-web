import * as Actions from "../../actions";
import {ShowBookingAction} from "../../actions";
import {ProfileEntity} from "../../../types";

export interface BookingState {
  show_booking?: boolean
  data_booking?:ProfileEntity
}

const initState: BookingState = {
  show_booking: false,
}

export default (state = initState, {
  type,
  show_booking,
  data_booking
}: ShowBookingAction): BookingState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_BOOKING:
      return {
        ...state,
        show_booking,
        data_booking,
      }
    default:
      return state;
  }
}
