import {UpdateCommentRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateCommentAction {
  type: string,
  request?: UpdateCommentRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_ERROR = "UPDATE_COMMENT_ERROR";

export const updateComment = (request: UpdateCommentRequest): UpdateCommentAction => ({
  type: UPDATE_COMMENT,
  request
});

export const updateCommentSuccess = (response: ResponseBase2): UpdateCommentAction => ({
  type: UPDATE_COMMENT_SUCCESS,
  response
});

export const updateCommentError = (error: AppError): UpdateCommentAction => ({
  type: UPDATE_COMMENT_ERROR,
  error
});
