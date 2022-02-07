import {StatusCVEntity} from "../../../StatusCVManager/types";

export interface ProcessFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: StatusCVEntity,
  index?:number
}

export const SHOW_FORM_PROCESS_CREATE = "SHOW_FORM_PROCESS_CREATE";
export const SHOW_FORM_PROCESS_UPDATE = "SHOW_FORM_PROCESS_UPDATE";

export const showFormCreate = (show: boolean): ProcessFormAction => ({
  type: SHOW_FORM_PROCESS_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: StatusCVEntity,index?:number): ProcessFormAction => ({
  type: SHOW_FORM_PROCESS_UPDATE,
  show_update: show,
  data_update: dataUpdate,
  index,
});

