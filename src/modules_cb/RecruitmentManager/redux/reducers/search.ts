import {RecruitmentEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {RecruitmentListAction} from "../actions";

export interface SearchRecruitmentState {
  loading: boolean,
  params?: any,
  rows?: RecruitmentEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SearchRecruitmentState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

export default (state = initState, {type, total, rows, params, error}: RecruitmentListAction): SearchRecruitmentState => {
  switch (type) {
    case Actions.GET_SEARCH_RECRUITMENT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_SEARCH_RECRUITMENT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_SEARCH_RECRUITMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
