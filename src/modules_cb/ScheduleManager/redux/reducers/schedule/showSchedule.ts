import * as Actions from "../../actions";
import {ShowScheduleAction} from "../../actions";

export interface ScheduleState {
  show_schedule?: boolean
}

const initState: ScheduleState = {
  show_schedule: false,
}

export default (state = initState, {
  type,
  show_schedule,
}: ShowScheduleAction): ScheduleState => {
  switch (type) {
    case Actions.SHOW_FORM_SCHEDULE:
      return {
        ...state,
        show_schedule,
      }
    default:
      return state;
  }
}
