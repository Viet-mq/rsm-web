import * as Actions from "../../actions";
import {ShowScheduleAction} from "../../actions";
import {DataShowSchedule} from "../../../types";

export interface ScheduleState {
  show_schedule?: boolean
  data_schedule?:DataShowSchedule
}

const initState: ScheduleState = {
  show_schedule: false,
}

export default (state = initState, {
  type,
  show_schedule,
  data_schedule
}: ShowScheduleAction): ScheduleState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_SCHEDULE:
      return {
        ...state,
        show_schedule,
        data_schedule,
      }
    default:
      return state;
  }
}
