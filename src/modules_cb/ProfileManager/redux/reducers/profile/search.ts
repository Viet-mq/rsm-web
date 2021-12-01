import {AppError} from "../../../../../models/common";
import * as Actions from "../../actions";
import {GetElasticSearchAction} from "../../actions";
import {ProfileEntity, SearchRequest} from "../../../types";

export interface GetElasticSearchState {
  loading: boolean,
  loadingRs: boolean,
  request?: SearchRequest,
  rowsSearch?: ProfileEntity[] | any,
  rowsRs?: ProfileEntity[] | any,
  total?: number,
  error?: AppError,
  triggerSearch: boolean
}

const initState: GetElasticSearchState = {
  loading: false,
  loadingRs: false,
  rowsSearch: [],
  rowsRs: undefined,
  total: 0,
  triggerSearch: false,

}

export default (state = initState, {
  type,
  request,
  rowsSearch,
  rowsRs,
  total,
  error,
}: GetElasticSearchAction): GetElasticSearchState => {
  switch (type) {
    case Actions.GET_ELASTIC_SEARCH:
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
    case Actions.GET_ELASTIC_SEARCH_RESULT_SUCCESS:
      let triggerSearch = !state.triggerSearch
      return {
        ...state,
        total,
        rowsRs,
        triggerSearch: triggerSearch,
        loadingRs: false
      }
    case Actions.GET_ELASTIC_SEARCH_ERROR:
      return {
        ...state,
        error,
        loading: false,
        loadingRs: false
      }
    case Actions.TRIGGER_SEARCH:
      return {
        ...state,
        loadingRs: true
      }

    default:
      return state;
  }
}
