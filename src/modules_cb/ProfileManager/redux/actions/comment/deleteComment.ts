import {DeleteCommentRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteCommentAction {
  type: string,
  request?: DeleteCommentRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_ERROR = "DELETE_COMMENT_ERROR";

export const deleteComment = (request: DeleteCommentRequest): DeleteCommentAction => ({
  type: DELETE_COMMENT,
  request
});

export const deleteCommentSuccess = (response: ResponseBase2): DeleteCommentAction => ({
  type: DELETE_COMMENT_SUCCESS,
  response
});

export const deleteCommentError = (error: AppError): DeleteCommentAction => ({
  type: DELETE_COMMENT_ERROR,
  error
});
