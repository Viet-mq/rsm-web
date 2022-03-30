import {ApiEntity} from "../../types";

export interface ShowFormAPIAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  entity?: ApiEntity
}

export const SHOW_FORM_CREATE_API = "SHOW_FORM_CREATE_API";
export const SHOW_FORM_UPDATE_API = "SHOW_FORM_UPDATE_API";

export const showFormCreateApi = (show_create: boolean): ShowFormAPIAction => ({
  type: SHOW_FORM_CREATE_API,
  show_create
});

export const showFormUpdateApi = (show_update: boolean, entity?: ApiEntity): ShowFormAPIAction => ({
  type: SHOW_FORM_UPDATE_API,
  show_update,
  entity
});
