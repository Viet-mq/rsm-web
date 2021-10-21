import {CreateTalentPoolRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateTalentPoolAction} from "../actions";

export interface CreateTalentPoolState {
  loading: boolean,
  request?: CreateTalentPoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateTalentPoolState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateTalentPoolAction): CreateTalentPoolState => {
  switch (type) {
    case Actions.CREATE_TALENT_POOL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_TALENT_POOL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_TALENT_POOL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
