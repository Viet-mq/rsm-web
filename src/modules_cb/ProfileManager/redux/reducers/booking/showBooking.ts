import * as Actions from "../../actions";
import {ShowBookingAction} from "../../actions";

export interface BookingState {
  show_booking?: boolean
  idProfile?:string
}

const initState: BookingState = {
  show_booking: false,
  idProfile:''
}

export default (state = initState, {
  type,
  show_booking,
  idProfile
}: ShowBookingAction): BookingState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_BOOKING:
      return {
        ...state,
        show_booking,
        idProfile,
      }
    default:
      return state;
  }
}
