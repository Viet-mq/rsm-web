import {JobLevelEntity} from "../../types";

export interface JobLevelFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: JobLevelEntity
}

export const JOBLEVEL_SHOW_FORM_CREATE = "JOBLEVEL_SHOW_FORM_CREATE";
export const JOBLEVEL_SHOW_FORM_UPDATE = "JOBLEVEL_SHOW_FORM_UPDATE";

export const showFormCreate = (show: boolean): JobLevelFormAction => ({
  type: JOBLEVEL_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: JobLevelEntity): JobLevelFormAction => ({
  type: JOBLEVEL_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

