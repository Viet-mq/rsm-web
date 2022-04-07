import {SkillEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchSkillAction} from "../actions";

export interface SearchSkillState {
  loading: boolean,
  params?: any,
  rows?: SkillEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SearchSkillState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}


export default (state = initState, {type, total, rows, params, error}: SearchSkillAction): SearchSkillState => {
  switch (type) {
    case Actions.SEARCH_LIST_SKILL:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.SEARCH_LIST_SKILL_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.SEARCH_LIST_SKILL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
