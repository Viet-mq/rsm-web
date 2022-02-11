import {CommentEntity} from "../../../types";
import {AppError} from "../../../../../models/baseResponse";

export interface GetListCommentAction {
  type:string,
  params?:any,
  result?:CommentEntity|any
  error?:AppError
}

export const GET_LIST_COMMENT = "GET_LIST_COMMENT";
export const GET_LIST_COMMENT_SUCCESS = "GET_LIST_COMMENT_SUCCESS";
export const GET_LIST_COMMENT_ERROR = "GET_LIST_COMMENT_ERROR";

export const getListComment = (params:any) : GetListCommentAction =>({
  type:GET_LIST_COMMENT,
  params,
})

export const getCommentSuccess = (result?:CommentEntity) =>({
  type:GET_LIST_COMMENT_SUCCESS,
  result
})

export const getCommentError =( error:AppError): GetListCommentAction=>({
  type:GET_LIST_COMMENT_ERROR,
  error
})
