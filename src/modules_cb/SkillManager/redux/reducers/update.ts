import {UpdateSkillRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateSkillAction} from "../actions";

export interface UpdateSkillState {
  loading: boolean,
  request?: UpdateSkillRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateSkillState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateSkillAction): UpdateSkillState => {
  switch (type) {
    case Actions.UPDATE_SKILL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_SKILL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_SKILL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
