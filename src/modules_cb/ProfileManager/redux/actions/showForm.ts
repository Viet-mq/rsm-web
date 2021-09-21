import {ProfileEntity} from "../../types";

export interface ProfileFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: ProfileEntity
}

export const PROFILE_SHOW_FORM_CREATE = "PROFILE_SHOW_FORM_CREATE";
export const PROFILE_SHOW_FORM_UPDATE = "PROFILE_SHOW_FORM_UPDATE";

export const showFormCreate = (show: boolean): ProfileFormAction => ({
  type: PROFILE_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: ProfileEntity): ProfileFormAction => ({
  type: PROFILE_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

