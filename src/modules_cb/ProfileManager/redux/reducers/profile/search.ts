import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import { GetElasticSearchAction } from "../../actions";

export interface GetElasticSearchState {
  loading: boolean,
  request?: any,
  response?: ResponseBase2,
  error?: AppError
}

const initState: GetElasticSearchState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: GetElasticSearchAction): GetElasticSearchState => {
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
        response,
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
