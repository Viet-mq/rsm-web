import * as Actions from "../../actions";
import { ShowCommentAction} from "../../actions";
import {CommentEntity} from "../../../types";

export interface ShowCommentState {
  show_comment_update?: boolean,
  show_comment_create?: boolean,
  data_update?:CommentEntity,
  idProfile?:string|any,
}

const initState: ShowCommentState = {
  show_comment_update: false,
  show_comment_create: false,
}

export default (state = initState, {
  type,
  show_comment_update,
  show_comment_create,
  data_update,
  idProfile
}: ShowCommentAction): ShowCommentState => {
  switch (type) {
    case Actions.SHOW_FORM_COMMENT_CREATE:
      return {
        ...state,
        show_comment_create,
        idProfile,
        show_comment_update: false,

      }
    case Actions.SHOW_FORM_COMMENT_UPDATE:
      return {
        ...state,
        show_comment_update,
        data_update,
        show_comment_create: false,
      }
    default:
      return state;
  }
}
