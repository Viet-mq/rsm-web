import {CreateSkillRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateSkillAction {
  type: string,
  request?: CreateSkillRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_SKILL = "CREATE_SKILL";
export const CREATE_SKILL_SUCCESS = "CREATE_SKILL_SUCCESS";
export const CREATE_SKILL_ERROR = "CREATE_SKILL_ERROR";

export const createSkill = (request: CreateSkillRequest): CreateSkillAction => ({
  type: CREATE_SKILL,
  request
});

export const createSkillSuccess = (response: ResponseBase2): CreateSkillAction => ({
  type: CREATE_SKILL_SUCCESS,
  response
});

export const createSkillError = (error: AppError): CreateSkillAction => ({
  type: CREATE_SKILL_ERROR,
  error
});
