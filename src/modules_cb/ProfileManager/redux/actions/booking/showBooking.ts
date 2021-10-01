export interface ShowBookingAction {
  type: string,
  show_booking?: boolean,
  idProfile?:string,
}

export const PROFILE_SHOW_FORM_BOOKING = "PROFILE_SHOW_FORM_BOOKING";

export const showFormBooking = (show: boolean,idProfile?:string): ShowBookingAction => ({
  type:PROFILE_SHOW_FORM_BOOKING,
  show_booking:show,
  idProfile:idProfile
})
