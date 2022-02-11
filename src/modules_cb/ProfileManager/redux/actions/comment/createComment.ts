import {CreateCommentRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";

export interface CreateCommentAction {
  type:string,
  request?:CreateCommentRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_COMMENT = "CREATE_COMMENT";
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_ERROR = "CREATE_COMMENT_ERROR";

export const createComment = (request: CreateCommentRequest): CreateCommentAction => ({
  type: CREATE_COMMENT,
  request
});

export const createCommentSuccess = (response: ResponseBase2): CreateCommentAction => ({
  type: CREATE_COMMENT_SUCCESS,
  response
});

export const createCommentError = (error: AppError): CreateCommentAction => ({
  type: CREATE_COMMENT_ERROR,
  error
});
