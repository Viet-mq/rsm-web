import {AppError} from "../../../../../models/common";
import * as Actions from "../../actions";
import {GetElasticSearchAction} from "../../actions";
import {ProfileEntity} from "../../../types";

export interface GetElasticSearchState {
  loading: boolean,
  request?: any,
  rows?: ProfileEntity[]|any,
  total?: number,
  error?: AppError
}

const initState: GetElasticSearchState = {
  loading: false,
  request: null,
  rows: [],
  total: 0
}

export default (state = initState, {
  type,
  request,
  rows,
  total,
  error
}: GetElasticSearchAction): GetElasticSearchState => {
  switch (type) {
    case Actions.GET_ELASTIC_SEARCH:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.GET_ELASTIC_SEARCH_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false
      }
    case Actions.GET_ELASTIC_SEARCH_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
