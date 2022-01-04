import {CreateReasonRejectRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateReasonRejectAction} from "../actions";

export interface CreateReasonRejectState {
  loading: boolean,
  request?: CreateReasonRejectRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateReasonRejectState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateReasonRejectAction): CreateReasonRejectState => {
  switch (type) {
    case Actions.CREATE_REASON_REJECT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_REASON_REJECT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_REASON_REJECT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
