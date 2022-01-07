import {CreateTalentPoolRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateTalentPoolAction} from "../actions";

export interface CreateTalentPoolState {
  loading: boolean,
  request?: CreateTalentPoolRequest,
  response?: ResponseBase2,
  error?: AppError,
  title?: string

}

const initState: CreateTalentPoolState = {
  loading: false
}

export default (state = initState, {
  type,
  request,
  response,
  error,
  title
}: CreateTalentPoolAction): CreateTalentPoolState => {
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

    case Actions.SET_TITLE_TALENT_POOLS:
      return {
        ...state,
        title,
        loading: false
      }
    default:
      return state;
  }
}
