import {JobLevelEntity} from "../../types";

export interface JobLevelFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: JobLevelEntity
}

export const JOB_LEVEL_SHOW_FORM_CREATE = "JOB_LEVEL_SHOW_FORM_CREATE";
export const JOB_LEVEL_SHOW_FORM_UPDATE = "JOB_LEVEL_SHOW_FORM_UPDATE";

export const showFormCreate = (show: boolean): JobLevelFormAction => ({
  type: JOB_LEVEL_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: JobLevelEntity): JobLevelFormAction => ({
  type: JOB_LEVEL_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

