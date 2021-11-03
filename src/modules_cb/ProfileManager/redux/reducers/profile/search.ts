import {AppError} from "../../../../../models/common";
import * as Actions from "../../actions";
import {GetElasticSearchAction} from "../../actions";
import {ProfileEntity, SearchRequest} from "../../../types";

export interface GetElasticSearchState {
  loading: boolean,
  request?: SearchRequest,
  rows?: ProfileEntity[]|any,
  total?: number,
  error?: AppError,
  pushbackHis:boolean
}

const initState: GetElasticSearchState = {
  loading: false,
  rows: [],
  total: 0,
  pushbackHis:false

}

export default (state = initState, {
  type,
  request,
  rows,
  total,
  error,
}: GetElasticSearchAction): GetElasticSearchState => {
  switch (type) {
    case Actions.GET_ELASTIC_SEARCH:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.GET_ELASTIC_SEARCH_SUCCESS:
      let pushbackHis =state.pushbackHis
      return {
        ...state,
        total,
        rows,
        pushbackHis:!pushbackHis,
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
