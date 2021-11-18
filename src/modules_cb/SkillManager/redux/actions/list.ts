import {SkillEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SkillListAction {
  type: string,
  params?: any,
  rows?: SkillEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_SKILL = "GET_LIST_SKILL";
export const GET_LIST_SKILL_SUCCESS = "GET_LIST_SKILL_SUCCESS";
export const GET_LIST_SKILL_ERROR = "GET_LIST_SKILL_ERROR";

export const getListSkill = (params: any): SkillListAction => ({
  type: GET_LIST_SKILL,
  params
});

export const getListSkillSuccess = (total: number, rows: SkillEntity[]): SkillListAction => ({
  type: GET_LIST_SKILL_SUCCESS,
  total,
  rows
});

export const getListSkillError = (error: AppError): SkillListAction => ({
  type: GET_LIST_SKILL_ERROR,
  error
});
