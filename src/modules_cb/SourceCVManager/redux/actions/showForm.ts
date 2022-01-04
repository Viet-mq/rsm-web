import {SourceCVEntity} from "../../types";

export interface SourceCVFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: SourceCVEntity
}

export const SOURCECV_SHOW_FORM_CREATE = "SOURCECV_SHOW_FORM_CREATE";
export const SOURCECV_SHOW_FORM_UPDATE = "SOURCECV_SHOW_FORM_UPDATE";

export const showFormCreate = (show: boolean): SourceCVFormAction => ({
  type: SOURCECV_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: SourceCVEntity): SourceCVFormAction => ({
  type: SOURCECV_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

