import * as Actions from "../../actions";
import {ShowScheduleAction} from "../../actions";
import {DataShowSchedule} from "../../../types";

export interface ScheduleState {
  show_booking?: boolean
  data_booking?:DataShowSchedule
}

const initState: ScheduleState = {
  show_booking: false,
}

export default (state = initState, {
  type,
  show_booking,
  data_booking
}: ShowScheduleAction): ScheduleState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_SCHEDULE:
      return {
        ...state,
        show_booking,
        data_booking,
      }
    default:
      return state;
  }
}
