import {ApiRoleGroupEntity} from "../../types";

export interface ShowFormGroupApiAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  show_assign?: boolean,
  show_revoke?: boolean,
  entity?: ApiRoleGroupEntity
}

export const SHOW_API_GROUP_FORM_CREATE = "SHOW_API_GROUP_FORM_CREATE";
export const SHOW_API_GROUP_FORM_UPDATE = "SHOW_API_GROUP_FORM_CREATE";

export const showApiGroupFormCreate = (show_create: boolean): ShowFormGroupApiAction => ({
  type: SHOW_API_GROUP_FORM_CREATE,
  show_create
});

export const showApiGroupFormUpdate = (show_update: boolean, entity?: ApiRoleGroupEntity): ShowFormGroupApiAction => ({
  type: SHOW_API_GROUP_FORM_UPDATE,
  show_update,
  entity
});
