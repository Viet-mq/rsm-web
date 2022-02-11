import {DeleteCommentRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {DeleteCommentAction} from "../../actions";

export interface DeleteCommentState {
  loading: boolean,
  request?: DeleteCommentRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteCommentState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteCommentAction): DeleteCommentState => {
  switch (type) {
    case Actions.DELETE_COMMENT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_COMMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
