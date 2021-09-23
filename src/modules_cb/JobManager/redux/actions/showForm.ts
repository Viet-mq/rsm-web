import {JobEntity} from "../../types";

export interface JobFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: JobEntity
}

export const JOB_SHOW_FORM_CREATE = "JOB_SHOW_FORM_CREATE";
export const JOB_SHOW_FORM_UPDATE = "JOB_SHOW_FORM_UPDATE";

export const  showFormCreate = (show: boolean): JobFormAction => ({
  type: JOB_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: JobEntity): JobFormAction => ({
  type: JOB_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

