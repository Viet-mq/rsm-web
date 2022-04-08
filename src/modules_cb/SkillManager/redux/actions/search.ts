import {SkillEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchSkillAction {
  type: string,
  params?: any,
  rows?: SkillEntity[],
  total?: number,
  error?: AppError
}

export const SEARCH_LIST_SKILL = "SEARCH_LIST_SKILL";
export const SEARCH_LIST_SKILL_SUCCESS = "SEARCH_LIST_SKILL_SUCCESS";
export const SEARCH_LIST_SKILL_ERROR = "SEARCH_LIST_SKILL_ERROR";

export const searchListSkill = (params: any): SearchSkillAction => ({
  type: SEARCH_LIST_SKILL,
  params
});

export const searchListSkillSuccess = (total: number, rows: SkillEntity[]): SearchSkillAction => ({
  type: SEARCH_LIST_SKILL_SUCCESS,
  total,
  rows
});

export const searchListSkillError = (error: AppError): SearchSkillAction => ({
  type: SEARCH_LIST_SKILL_ERROR,
  error
});
