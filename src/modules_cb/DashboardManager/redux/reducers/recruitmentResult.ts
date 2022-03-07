import {RecruitmentResultReportEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {RecruitmentResultReportAction} from "../actions";

export interface RecruitmentResultReportState {
  loading: boolean,
  params?: any,
  rows?: RecruitmentResultReportEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: RecruitmentResultReportState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: RecruitmentResultReportAction): RecruitmentResultReportState => {
  switch (type) {
    case Actions.RECRUITMENT_RESULT_REPORT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.RECRUITMENT_RESULT_REPORT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.RECRUITMENT_RESULT_REPORT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
