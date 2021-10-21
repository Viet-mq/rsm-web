import {DeleteTalentPoolRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteTalentPoolAction} from "../actions";

export interface DeleteTalentPoolState {
  loading: boolean,
  request?: DeleteTalentPoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteTalentPoolState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteTalentPoolAction): DeleteTalentPoolState => {
  switch (type) {
    case Actions.DELETE_TALENT_POOL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_TALENT_POOL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_TALENT_POOL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
