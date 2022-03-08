import {DepartmentReportEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {DEPARTMENT_DOWNLOAD, DepartmentReportAction} from "../actions";

export interface DepartmentReportState {
  loading: boolean,
  params?: any,
  rows?: DepartmentReportEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: DepartmentReportState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: DepartmentReportAction): DepartmentReportState => {
  switch (type) {
    case Actions.DEPARTMENT_REPORT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.DEPARTMENT_REPORT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.DEPARTMENT_REPORT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
      case Actions.DEPARTMENT_DOWNLOAD:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}
