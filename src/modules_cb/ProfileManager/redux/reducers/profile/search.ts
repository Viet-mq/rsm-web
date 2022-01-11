import {AppError} from "../../../../../models/common";
import * as Actions from "../../actions";
import {GetElasticSearchAction} from "../../actions";
import {ProfileEntity, SearchRequest} from "../../../types";

export interface GetElasticSearchState {
  loading: boolean,
  loadingRs: boolean,
  request?: SearchRequest,
  requestSearchFull?: SearchRequest,
  rowsSearch?: ProfileEntity[] | any,
  rowsSearchFull?: ProfileEntity[] | any,
  total?: number,
  totalSearchFull?: number,

  error?: AppError,
}

const initState: GetElasticSearchState = {
  loading: false,
  loadingRs: false,
  rowsSearch: [],
  rowsSearchFull: undefined,
  total: 0,
  totalSearchFull: 0,


}

export default (state = initState, {
  type,
  request,
  rowsSearch,
  rowsSearchFull,
  total,
  totalSearchFull,
  error,
  requestSearchFull,

}: GetElasticSearchAction): GetElasticSearchState => {
  switch (type) {
    case Actions.GET_ELASTIC_SEARCH:
      return {
        ...state,
        request,
        loading: true,
      }
    case Actions.GET_FULL_ELASTIC_SEARCH:
      return {
        ...state,
        requestSearchFull,
        loadingRs: true,
      }
    case Actions.RESET_SEARCH:
      return {
        ...state,
        request,
        loading: true,
      }
    case Actions.GET_ELASTIC_SEARCH_SUCCESS:
      return {
        ...state,
        total,
        rowsSearch,
        loading: false
      }

    case Actions.GET_FULL_ELASTIC_SEARCH_SUCCESS:
      return {
        ...state,
        totalSearchFull,
        rowsSearchFull,
        loadingRs: false
      }

    case Actions.GET_ELASTIC_SEARCH_ERROR:
      return {
        ...state,
        error,
        loading: false,
        loadingRs: false
      }

    default:
      return state;
  }
}
