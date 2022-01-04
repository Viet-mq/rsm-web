import {MenuFrontendEntity} from "../../types";

export interface ShowFormMenuFrontendAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  show_detail?: boolean,
  show_action_view?: boolean,
  view?: MenuFrontendEntity,
  data_detail?:MenuFrontendEntity

}

export const SHOW_FORM_MENU_FRONTEND_CREATE = "SHOW_FORM_MENU_FRONTEND_CREATE";
export const SHOW_FORM_MENU_FRONTEND_UPDATE = "SHOW_FORM_MENU_FRONTEND_UPDATE";
export const SHOW_FORM_MENU_FRONTEND_DETAIL = "SHOW_FORM_MENU_FRONTEND_DETAIL";
export const SHOW_FORM_ADD_ACTION_VIEW = "SHOW_FORM_ADD_ACTION_VIEW";

export const showFormMenuFrontEndCreate = (show_create: boolean): ShowFormMenuFrontendAction => ({
  type: SHOW_FORM_MENU_FRONTEND_CREATE,
  show_create
});

export const showFormMenuFrontEndUpdate = (show_update: boolean,view?:MenuFrontendEntity): ShowFormMenuFrontendAction => ({
  type: SHOW_FORM_MENU_FRONTEND_UPDATE,
  show_update,
  view
});

export const showFormMenuFrontEndDetail = (show_detail: boolean,view?:MenuFrontendEntity): ShowFormMenuFrontendAction => ({
  type: SHOW_FORM_MENU_FRONTEND_DETAIL,
  show_detail,
  view
});

export const showFormActionView = (show_action_view: boolean,data_detail?:MenuFrontendEntity): ShowFormMenuFrontendAction => ({
  type: SHOW_FORM_ADD_ACTION_VIEW,
  show_action_view,
  data_detail
});

