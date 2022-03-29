import {ViewRolesEntity} from "../../types";

export interface ShowViewRolesFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: ViewRolesEntity
}

export const SHOW_FORM_VIEW_ROLES_CREATE = "SHOW_FORM_VIEW_ROLES_CREATE";
export const SHOW_FORM_VIEW_ROLES_UPDATE = "SHOW_FORM_VIEW_ROLES_UPDATE";

export const  showFormCreate = (show: boolean): ShowViewRolesFormAction => ({
  type: SHOW_FORM_VIEW_ROLES_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: ViewRolesEntity): ShowViewRolesFormAction => ({
  type: SHOW_FORM_VIEW_ROLES_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

