import {UpdateCommentRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {UpdateCommentAction} from "../../actions";

export interface UpdateCommentState {
  loading: boolean,
  request?: UpdateCommentRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateCommentState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateCommentAction): UpdateCommentState => {
  switch (type) {
    case Actions.UPDATE_COMMENT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_COMMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
