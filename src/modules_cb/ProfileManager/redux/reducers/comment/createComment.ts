import {CreateCommentRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {CreateCommentAction} from "../../actions";

export interface CreateCommentState {
  loading: boolean,
  request?: CreateCommentRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateCommentState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateCommentAction): CreateCommentState => {
  switch (type) {
    case Actions.CREATE_COMMENT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_COMMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
