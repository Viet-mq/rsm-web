import {DataShowBooking} from "../../../types";

export interface ShowBookingAction {
  type: string,
  show_booking?: boolean,
  data_booking?:DataShowBooking,
}

export const PROFILE_SHOW_FORM_BOOKING = "PROFILE_SHOW_FORM_BOOKING";

export const showFormBooking = (show: boolean,data?:DataShowBooking): ShowBookingAction => ({
  type:PROFILE_SHOW_FORM_BOOKING,
  show_booking:show,
  data_booking:data
})
