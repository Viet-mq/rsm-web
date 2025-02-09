import {RecruitmentEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {DetailRecruitmentAction} from "../actions";


export interface DetailRecruitmentState {
  loading: boolean,
  params?: any,
  rows?: RecruitmentEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: DetailRecruitmentState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: DetailRecruitmentAction): DetailRecruitmentState => {
  switch (type) {
    case Actions.GET_DETAIL_RECRUITMENT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_DETAIL_RECRUITMENT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_DETAIL_RECRUITMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
