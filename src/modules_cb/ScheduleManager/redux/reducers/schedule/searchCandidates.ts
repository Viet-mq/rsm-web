import {AppError} from "../../../../../models/baseResponse";
import * as Actions from "../../actions";
import {SearchCandidatesAction} from "../../actions";
import {ProfileEntity} from "../../../../ProfileManager/types";

export interface SearchCandidatesState {
  loading: boolean,
  params?: any,
  rows?: ProfileEntity[],
  total?: number,
  error?: AppError,
}

const initState: SearchCandidatesState = {
  loading: false,
  params: {},
  rows: [],
  total: 0,
}


export default (state = initState, {type, total, rows, params, error}: SearchCandidatesAction): SearchCandidatesState => {
  switch (type) {
    case Actions.SEARCH_CANDIDATES:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.SEARCH_CANDIDATES_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false,
      }
    case Actions.SEARCH_CANDIDATES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
