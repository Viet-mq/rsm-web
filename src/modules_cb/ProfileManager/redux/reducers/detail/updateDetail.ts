import {UpdateDetailRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {UpdateDetailAction} from "../../actions/detail/updateDetail";

export interface UpdateDetailState {
  loading: boolean,
  request?: UpdateDetailRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateDetailState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateDetailAction): UpdateDetailState => {
  switch (type) {
    case Actions.UPDATE_DETAIL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_DETAIL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_DETAIL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
