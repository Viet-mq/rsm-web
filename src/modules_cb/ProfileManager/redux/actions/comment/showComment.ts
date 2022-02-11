import { CommentEntity} from "../../../types";

export interface ShowCommentAction {
  type: string,
  show_comment_update?: boolean,
  show_comment_create?: boolean,
  data_update?:CommentEntity,
  idProfile?:string
}

export const SHOW_FORM_COMMENT_CREATE = "SHOW_FORM_COMMENT_CREATE";
export const SHOW_FORM_COMMENT_UPDATE = "SHOW_FORM_COMMENT_UPDATE";

export const showFormCreateComment = (show: boolean,idProfile?:string): ShowCommentAction => ({
  type: SHOW_FORM_COMMENT_CREATE,
  show_comment_create: show,
  idProfile
});

export const showFormUpdateComment = (show: boolean, dataUpdate?: CommentEntity): ShowCommentAction => ({
  type: SHOW_FORM_COMMENT_UPDATE,
  show_comment_update: show,
  data_update: dataUpdate
});
