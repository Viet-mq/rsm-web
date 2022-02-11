import {AppError} from "../../../../../models/baseResponse";
import * as Actions from "../../actions";
import {GetCandidatesAction} from "../../actions";
import {ProfileEntity} from "../../../../ProfileManager/types";

export interface GetCandidatesState {
  loading: boolean,
  params?: any,
  rows?: ProfileEntity[],
  total?: number,
  error?: AppError,
}

const initState: GetCandidatesState = {
  loading: false,
  params: {},
  rows: [],
  total: 0,
}


export default (state = initState, {type, total, rows, params, error}: GetCandidatesAction): GetCandidatesState => {
  switch (type) {
    case Actions.GET_CANDIDATES:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_CANDIDATES_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false,
      }
    case Actions.GET_CANDIDATES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    case Actions.RESET_CANDIDATES:
      return initState;
    default:
      return state;
  }
}
