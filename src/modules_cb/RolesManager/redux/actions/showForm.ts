import {RolesEntity} from "../../types";

export interface ShowRolesFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: RolesEntity,
  show_add_api_roles?:boolean,
  show_add_view_roles?:boolean,
}

export const SHOW_FORM_ROLES_CREATE = "SHOW_FORM_ROLES_CREATE";
export const SHOW_FORM_ROLES_UPDATE = "SHOW_FORM_ROLES_UPDATE";
export const SHOW_FORM_ADD_API_ROLES = "SHOW_FORM_ADD_API_ROLES";
export const SHOW_FORM_ADD_VIEW_ROLES = "SHOW_FORM_ADD_VIEW_ROLES";

export const  showFormCreate = (show: boolean): ShowRolesFormAction => ({
  type: SHOW_FORM_ROLES_CREATE,
  show_create: show
});

export const  showFormAddAPIRoles = (show: boolean): ShowRolesFormAction => ({
  type: SHOW_FORM_ADD_API_ROLES,
  show_add_api_roles: show
});

export const  showFormAddViewRoles = (show: boolean): ShowRolesFormAction => ({
  type: SHOW_FORM_ADD_VIEW_ROLES,
  show_add_view_roles: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: RolesEntity): ShowRolesFormAction => ({
  type: SHOW_FORM_ROLES_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

