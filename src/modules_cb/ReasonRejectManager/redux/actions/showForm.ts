import {ReasonRejectEntity} from "../../types";

export interface ReasonRejectFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: ReasonRejectEntity
}

export const REASON_REJECT_SHOW_FORM_CREATE = "REASON_REJECT_SHOW_FORM_CREATE";
export const REASON_REJECT_SHOW_FORM_UPDATE = "REASON_REJECT_SHOW_FORM_UPDATE";

export const  showFormCreate = (show: boolean): ReasonRejectFormAction => ({
  type: REASON_REJECT_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: ReasonRejectEntity): ReasonRejectFormAction => ({
  type: REASON_REJECT_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

