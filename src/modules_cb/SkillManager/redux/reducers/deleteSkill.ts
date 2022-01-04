import {DeleteSkillRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteSkillAction} from "../actions";

export interface DeleteSkillState {
  loading: boolean,
  request?: DeleteSkillRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteSkillState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteSkillAction): DeleteSkillState => {
  switch (type) {
    case Actions.DELETE_SKILL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_SKILL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_SKILL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
