import {GroupAPIEntity} from "../../types";

export interface ShowGroupAPIAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  show_add_api?: boolean,
  show_assign_user?: boolean,
  view?: GroupAPIEntity
}

export const SHOW_CREATE_GROUP_API_FORM = "SHOW_CREATE_GROUP_API_FORM";
export const SHOW_UPDATE_GROUP_API_FORM = "SHOW_UPDATE_GROUP_API_FORM";
export const SHOW_ADD_USER_FORM = "SHOW_ADD_USER_FORM";
export const SHOW_ADD_API_FORM = "SHOW_ADD_API_FORM";

export const showCreateGroupAPIForm = (show_create: boolean): ShowGroupAPIAction => ({
  type: SHOW_CREATE_GROUP_API_FORM,
  show_create
});

export const showUpdateGroupAPIForm = (show_update: boolean, view?: GroupAPIEntity): ShowGroupAPIAction => ({
  type: SHOW_UPDATE_GROUP_API_FORM,
  show_update,
  view
});

export const showAssignUserForm = (show_assign_user: boolean): ShowGroupAPIAction => ({
  type: SHOW_ADD_USER_FORM,
  show_assign_user
});

export const showAddAPIForm = (show_add_api: boolean): ShowGroupAPIAction => ({
  type: SHOW_ADD_API_FORM,
  show_add_api
});
