import {SkillEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {SearchSkillAction} from "../actions";

export interface SkillListState {
  loading: boolean,
  params?: any,
  rows?: SkillEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: SkillListState = {
  loading: false,
  params: {},
  rows: [],
  total: 0
}

const saveSkill:any=localStorage.getItem('list-skill');
const dataSkill:SkillListState = JSON.parse(saveSkill)?JSON.parse(saveSkill):initState

export default (state = dataSkill, {type, total, rows, params, error}: SearchSkillAction): SkillListState => {
  switch (type) {
    case Actions.GET_LIST_SKILL:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_SKILL_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_LIST_SKILL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
