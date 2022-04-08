import {DataShowBooking} from "../../../types";

export interface ShowBookingAction {
  type: string,
  show_booking?: boolean,
  data_booking?: DataShowBooking,
  data_update_booking?: any,
  show_email_create?: boolean
  show_email_change_process?: boolean
  show_email_update?: boolean
  show_interview_email_create?: boolean
  is_update?: boolean
}

export const PROFILE_SHOW_FORM_BOOKING = "PROFILE_SHOW_FORM_BOOKING";
export const SHOW_EMAIL_CREATE_FORM = "SHOW_EMAIL_CREATE_FORM";
export const SHOW_EMAIL_CHANGE_PROCESS_FORM = "SHOW_EMAIL_CHANGE_PROCESS_FORM";
export const SHOW_INTERVIEW_EMAIL_CREATE_FORM = "SHOW_INTERVIEW_EMAIL_CREATE_FORM";
export const SHOW_EMAIL_UPDATE_FORM = "SHOW_EMAIL_UPDATE_FORM";

export const showFormBooking = (show: boolean, data?: DataShowBooking, dataUpdateBooking?: any, isUpdate?: boolean): ShowBookingAction => ({
  type: PROFILE_SHOW_FORM_BOOKING,
  show_booking: show,
  data_booking: data,
  data_update_booking: dataUpdateBooking,
  is_update: isUpdate
})

export const showEmailCreateForm = (show: boolean): ShowBookingAction => ({
  type: SHOW_EMAIL_CREATE_FORM,
  show_email_create: show,
})

export const showEmailChangeProcessForm = (show: boolean): ShowBookingAction => ({
  type: SHOW_EMAIL_CHANGE_PROCESS_FORM,
  show_email_change_process: show,
})
export const showInterviewEmailCreateForm = (show: boolean): ShowBookingAction => ({
  type: SHOW_INTERVIEW_EMAIL_CREATE_FORM,
  show_interview_email_create: show,
})
export const showEmailUpdateForm = (show: boolean): ShowBookingAction => ({
  type: SHOW_EMAIL_UPDATE_FORM,
  show_email_update: show,
})
