import {DataShowBooking} from "../../../types";

export interface ShowBookingAction {
  type: string,
  show_booking?: boolean,
  data_booking?:DataShowBooking,
  show_email?:boolean
}

export const PROFILE_SHOW_FORM_BOOKING = "PROFILE_SHOW_FORM_BOOKING";
export const SHOW_EMAIL_FORM = "SHOW_EMAIL_FORM";

export const showFormBooking = (show: boolean,data?:DataShowBooking): ShowBookingAction => ({
  type:PROFILE_SHOW_FORM_BOOKING,
  show_booking:show,
  data_booking:data
})

export const showEmailForm = (show: boolean): ShowBookingAction => ({
  type:SHOW_EMAIL_FORM,
  show_email:show,
})
