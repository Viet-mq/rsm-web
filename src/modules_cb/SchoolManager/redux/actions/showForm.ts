import {SchoolEntity} from "../../types";

export interface SchoolFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: SchoolEntity
}

export const SCHOOL_SHOW_FORM_CREATE = "SCHOOL_SHOW_FORM_CREATE";
export const SCHOOL_SHOW_FORM_UPDATE = "SCHOOL_SHOW_FORM_UPDATE";

export const showFormCreate = (show: boolean): SchoolFormAction => ({
  type: SCHOOL_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: SchoolEntity): SchoolFormAction => ({
  type: SCHOOL_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

