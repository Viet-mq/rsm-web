import {RecruitmentActivitiesReportEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {RecruitmentActivitiesReportAction} from "../actions";

export interface RecruitmentActivitiesReportState {
  loading: boolean,
  params?: any,
  rows?: RecruitmentActivitiesReportEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: RecruitmentActivitiesReportState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: RecruitmentActivitiesReportAction): RecruitmentActivitiesReportState => {
  switch (type) {
    case Actions.RECRUITMENT_ACTIVITIES_REPORT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.RECRUITMENT_ACTIVITIES_REPORT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.RECRUITMENT_ACTIVITIES_REPORT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
