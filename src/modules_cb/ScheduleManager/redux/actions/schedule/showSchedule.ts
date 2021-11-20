import {DataShowSchedule} from "../../../types";

export interface ShowScheduleAction {
  type: string,
  show_booking?: boolean,
  data_booking?:DataShowSchedule,
}

export const PROFILE_SHOW_FORM_SCHEDULE = "PROFILE_SHOW_FORM_SCHEDULE";

export const showFormSchedule = (show: boolean,data?:DataShowSchedule): ShowScheduleAction => ({
  type:PROFILE_SHOW_FORM_SCHEDULE,
  show_booking:show,
  data_booking:data
})
