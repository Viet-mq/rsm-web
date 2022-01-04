import {UpdateTalentPoolRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateTalentPoolAction} from "../actions";

export interface UpdateTalentPoolState {
  loading: boolean,
  request?: UpdateTalentPoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateTalentPoolState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateTalentPoolAction): UpdateTalentPoolState => {
  switch (type) {
    case Actions.UPDATE_TALENT_POOL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_TALENT_POOL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_TALENT_POOL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
