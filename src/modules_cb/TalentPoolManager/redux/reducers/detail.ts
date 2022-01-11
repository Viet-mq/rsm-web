import {TalentPoolEntity} from "../../types";
import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {DetailTalentPoolAction} from "../actions";

export interface DetailTalentPoolState {
  loading: boolean,
  params?: any,
  result?: TalentPoolEntity[]|any,
  error?: AppError
}

const initState: DetailTalentPoolState = {
  loading: false,
  params: {},
}

export default (state = initState, {type, result, params, error}: DetailTalentPoolAction): DetailTalentPoolState => {
  switch (type) {
    case Actions.GET_DETAIL_TALENT_POOL:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_DETAIL_TALENT_POOL_SUCCESS:
      return {
        ...state,
        result,
        loading: false
      }
    case Actions.GET_DETAIL_TALENT_POOL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
