import {DeleteSkillRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteSkillAction {
  type: string,
  request?: DeleteSkillRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_SKILL = "DELETE_SKILL";
export const DELETE_SKILL_SUCCESS = "DELETE_SKILL_SUCCESS";
export const DELETE_SKILL_ERROR = "DELETE_SKILL_ERROR";

export const deleteSkill = (request: DeleteSkillRequest): DeleteSkillAction => ({
  type: DELETE_SKILL,
  request
});

export const deleteSkillSuccess = (response: ResponseBase2): DeleteSkillAction => ({
  type: DELETE_SKILL_SUCCESS,
  response
});

export const deleteSkillError = (error: AppError): DeleteSkillAction => ({
  type: DELETE_SKILL_ERROR,
  error
});
