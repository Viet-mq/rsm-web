export interface ShowScheduleAction {
  type: string,
  show_schedule?: boolean,
}

export const SHOW_FORM_SCHEDULE = "SHOW_FORM_SCHEDULE";

export const showFormSchedule = (show: boolean): ShowScheduleAction => ({
  type: SHOW_FORM_SCHEDULE,
  show_schedule: show,
})
