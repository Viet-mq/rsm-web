import {showFrontEndViewUpdateForm, VIEW_FRONT_END_SHOW_UPDATE_FORM} from "../../../ViewManager/redux/actions";
import {FrontendViewEntity} from "../../../ViewManager/types";
import {MenuFrontendEntity} from "../../types";

export interface ShowFormMenuFrontendAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  show_detail?: boolean,
  view?: MenuFrontendEntity

}

export const SHOW_FORM_MENU_FRONTEND_CREATE = "SHOW_FORM_MENU_FRONTEND_CREATE";
export const SHOW_FORM_MENU_FRONTEND_UPDATE = "SHOW_FORM_MENU_FRONTEND_UPDATE";
export const SHOW_FORM_MENU_FRONTEND_DETAIL = "SHOW_FORM_MENU_FRONTEND_DETAIL";

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

