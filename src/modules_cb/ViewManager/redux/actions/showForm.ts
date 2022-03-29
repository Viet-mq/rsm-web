import {ActionView, UpdateActionToViewRequest, ViewEntity} from "../../types";

export interface ShowViewFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  show_add_action?: boolean,
  show_update_action?: boolean,
  view?: ViewEntity,
  id_view?:string,
  actions?:UpdateActionToViewRequest,
}

export const SHOW_VIEW_CREATE_FORM = "SHOW_VIEW_CREATE_FORM";
export const SHOW_VIEW_UPDATE_FORM = "SHOW_VIEW_UPDATE_FORM";
export const SHOW_VIEW_ADD_ACTION_FORM = "SHOW_VIEW_ADD_ACTION_FORM";
export const SHOW_VIEW_UPDATE_ACTION_FORM = "SHOW_VIEW_UPDATE_ACTION_FORM";

export const showViewCreateForm = (show_create: boolean): ShowViewFormAction => ({
  type: SHOW_VIEW_CREATE_FORM,
  show_create
});

export const showViewUpdateForm = (show_update: boolean, view?: ViewEntity): ShowViewFormAction => ({
  type: SHOW_VIEW_UPDATE_FORM,
  show_update,
  view
});

export const showViewAddActionForm = (show_add_action: boolean, idView?: string): ShowViewFormAction => ({
  type: SHOW_VIEW_ADD_ACTION_FORM,
  show_add_action,
  id_view:idView
});

export const showViewUpdateActionForm = (show_update_action: boolean, actions?: UpdateActionToViewRequest): ShowViewFormAction => ({
  type: SHOW_VIEW_UPDATE_ACTION_FORM,
  show_update_action,
  actions
});
