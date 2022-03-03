import {RecruitmentEfficiencyReportEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {RecruitmentEfficiencyReportAction} from "../actions";

export interface RecruitmentEfficiencyReportState {
  loading: boolean,
  params?: any,
  rows?: RecruitmentEfficiencyReportEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: RecruitmentEfficiencyReportState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: RecruitmentEfficiencyReportAction): RecruitmentEfficiencyReportState => {
  switch (type) {
    case Actions.RECRUITMENT_EFFICIENCY_REPORT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.RECRUITMENT_EFFICIENCY_REPORT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.RECRUITMENT_EFFICIENCY_REPORT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
