import {CommentEntity} from "../../../types";
import {AppError} from "../../../../../models/baseResponse";
import * as Actions from "../../actions";
import {GetListCommentAction} from "../../actions";


export interface GetListCommentState {
  loading: boolean,
  params?: any,
  result?: CommentEntity|any,
  error?: AppError
}

const initState: GetListCommentState = {
  loading: false,
  params: {},
}

export default (state = initState, {
  type,
  params,
  error,
  result
}: GetListCommentAction): GetListCommentState => {
  switch (type) {
    case Actions.GET_LIST_COMMENT:
      return {
        ...state,
        params,
        loading: false,
      }
    case Actions.GET_LIST_COMMENT_SUCCESS:
      return {
        ...state,
        result,
        loading: false
      }
    case Actions.GET_LIST_COMMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }

}
