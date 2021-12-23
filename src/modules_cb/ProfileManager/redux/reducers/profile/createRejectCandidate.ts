import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {CreateRejectCandidateAction} from "../../actions";
import {CreateRejectCandidateRequest} from "../../../types";


export interface CreateRejectCandidateState {
  loading: boolean,
  request?: CreateRejectCandidateRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateRejectCandidateState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateRejectCandidateAction): CreateRejectCandidateState => {
  switch (type) {
    case Actions.CREATE_REJECT_CANDIDATE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_REJECT_CANDIDATE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_REJECT_CANDIDATE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
