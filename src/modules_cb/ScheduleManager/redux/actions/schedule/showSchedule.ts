import {DataShowSchedule} from "../../../types";

export interface ShowScheduleAction {
  type: string,
  show_schedule?: boolean,
  data_schedule?:DataShowSchedule,
}

export const PROFILE_SHOW_FORM_SCHEDULE = "PROFILE_SHOW_FORM_SCHEDULE";

export const showFormSchedule = (show: boolean,data?:DataShowSchedule): ShowScheduleAction => ({
  type:PROFILE_SHOW_FORM_SCHEDULE,
  show_schedule:show,
  data_schedule:data
})
