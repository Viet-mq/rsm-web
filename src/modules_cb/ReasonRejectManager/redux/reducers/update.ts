import {UpdateReasonRejectRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateReasonRejectAction} from "../actions";

export interface UpdateReasonRejectState {
  loading: boolean,
  request?: UpdateReasonRejectRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateReasonRejectState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateReasonRejectAction): UpdateReasonRejectState => {
  switch (type) {
    case Actions.UPDATE_REASON_REJECT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_REASON_REJECT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_REASON_REJECT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
