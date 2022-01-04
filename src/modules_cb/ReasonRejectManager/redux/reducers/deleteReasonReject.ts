import {DeleteReasonRejectRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteReasonRejectAction} from "../actions";

export interface DeleteReasonRejectState {
  loading: boolean,
  request?: DeleteReasonRejectRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteReasonRejectState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteReasonRejectAction): DeleteReasonRejectState => {
  switch (type) {
    case Actions.DELETE_REASON_REJECT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_REASON_REJECT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_REASON_REJECT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
