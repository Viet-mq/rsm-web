import {StatusCVEntity} from "../../types";

export interface StatusCVFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: StatusCVEntity
}

export const STATUSCV_SHOW_FORM_CREATE = "STATUSCV_SHOW_FORM_CREATE";
export const STATUSCV_SHOW_FORM_UPDATE = "STATUSCV_SHOW_FORM_UPDATE";

export const showFormCreate = (show: boolean): StatusCVFormAction => ({
  type: STATUSCV_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: StatusCVEntity): StatusCVFormAction => ({
  type: STATUSCV_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

