import {CreateSkillRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateSkillAction} from "../actions";

export interface CreateSkillState {
  loading: boolean,
  request?: CreateSkillRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateSkillState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateSkillAction): CreateSkillState => {
  switch (type) {
    case Actions.CREATE_SKILL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_SKILL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_SKILL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
