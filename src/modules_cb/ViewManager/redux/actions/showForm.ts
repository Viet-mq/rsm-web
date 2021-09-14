import {FrontendViewEntity} from "../../types";

export interface ViewShowFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  show_add_action?: boolean,
  view?: FrontendViewEntity
}

export const VIEW_FRONT_END_SHOW_CREATE_FORM = "VIEW_FRONT_END_SHOW_CREATE_FORM";
export const VIEW_FRONT_END_SHOW_UPDATE_FORM = "VIEW_FRONT_END_SHOW_UPDATE_FORM";
export const VIEW_FRONT_END_SHOW_ADD_ACTION_FORM = "VIEW_FRONT_END_SHOW_ADD_ACTION_FORM";

export const showFrontEndViewCreateForm = (show_create: boolean): ViewShowFormAction => ({
  type: VIEW_FRONT_END_SHOW_CREATE_FORM,
  show_create
});

export const showFrontEndViewUpdateForm = (show_update: boolean, view?: FrontendViewEntity): ViewShowFormAction => ({
  type: VIEW_FRONT_END_SHOW_UPDATE_FORM,
  show_update,
  view
});

export const showFrontEndViewAddActionForm = (show_add_action: boolean, view?: FrontendViewEntity): ViewShowFormAction => ({
  type: VIEW_FRONT_END_SHOW_ADD_ACTION_FORM,
  show_add_action,
  view
});
