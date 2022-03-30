import {APIRolesEntity} from "../../types";

export interface ShowAPIRolesFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: APIRolesEntity
}

export const SHOW_FORM_API_ROLES_CREATE = "SHOW_FORM_API_ROLES_CREATE";
export const SHOW_FORM_API_ROLES_UPDATE = "SHOW_FORM_API_ROLES_UPDATE";

export const  showFormCreate = (show: boolean): ShowAPIRolesFormAction => ({
  type: SHOW_FORM_API_ROLES_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: APIRolesEntity): ShowAPIRolesFormAction => ({
  type: SHOW_FORM_API_ROLES_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

