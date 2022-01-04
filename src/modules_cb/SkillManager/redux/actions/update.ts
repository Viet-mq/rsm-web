import {UpdateSkillRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateSkillAction {
  type: string,
  request?: UpdateSkillRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_SKILL = "UPDATE_SKILL";
export const UPDATE_SKILL_SUCCESS = "UPDATE_SKILL_SUCCESS";
export const UPDATE_SKILL_ERROR = "UPDATE_SKILL_ERROR";

export const updateSkill = (request: UpdateSkillRequest): UpdateSkillAction => ({
  type: UPDATE_SKILL,
  request
});

export const updateSkillSuccess = (response: ResponseBase2): UpdateSkillAction => ({
  type: UPDATE_SKILL_SUCCESS,
  response
});

export const updateSkillError = (error: AppError): UpdateSkillAction => ({
  type: UPDATE_SKILL_ERROR,
  error
});
