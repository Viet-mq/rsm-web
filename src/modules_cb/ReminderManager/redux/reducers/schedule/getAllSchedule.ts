import {ScheduleEntity} from "../../../types";
import {AppError} from "../../../../../models/baseResponse";
import * as Actions from "../../actions";
import {GetScheduleAction} from "../../actions";


export interface GetScheduleState {
  loading: boolean,
  params?: any,
  result?: ScheduleEntity[]|any,
  error?: AppError
}

const initState: GetScheduleState = {
  loading: false,
  params: {},
}

export default (state = initState, {
  type,
  params,
  error,
  result
}: GetScheduleAction): GetScheduleState => {
  switch (type) {
    case Actions.GET_SCHEDULE:
      return {
        ...state,
        params,
        loading: false,
      }
    case Actions.GET_SCHEDULE_SUCCESS:
      return {
        ...state,
        result,
        loading: false
      }
    case Actions.GET_SCHEDULE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }

}
