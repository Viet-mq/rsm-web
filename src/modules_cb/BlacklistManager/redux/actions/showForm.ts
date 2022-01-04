import {BlacklistEntity} from "../../types";

export interface BlacklistFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: BlacklistEntity
}

export const BLACKLIST_SHOW_FORM_CREATE = "BLACKLIST_SHOW_FORM_CREATE";
export const BLACKLIST_SHOW_FORM_UPDATE = "BLACKLIST_SHOW_FORM_UPDATE";

export const showFormCreate = (show: boolean): BlacklistFormAction => ({
  type: BLACKLIST_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: BlacklistEntity): BlacklistFormAction => ({
  type: BLACKLIST_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

