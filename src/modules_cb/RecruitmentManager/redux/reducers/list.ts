import {RecruitmentEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {RecruitmentListAction} from "../actions";

export interface RecruitmentListState {
  loading: boolean,
  params?: any,
  rows?: RecruitmentEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: RecruitmentListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveRecruitment:any=localStorage.getItem('list-recruitment');
const dataRecruitment:RecruitmentListState = JSON.parse(saveRecruitment)?JSON.parse(saveRecruitment):initState

export default (state = dataRecruitment, {type, total, rows, params, error}: RecruitmentListAction): RecruitmentListState => {
  switch (type) {
    case Actions.GET_LIST_RECRUITMENT:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_RECRUITMENT_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_RECRUITMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
