import {DepartmentEntity} from "../../types";

export interface DepartmentFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: DepartmentEntity
}

export const DEPARTMENT_SHOW_FORM_CREATE = "DEPARTMENT_SHOW_FORM_CREATE";
export const DEPARTMENT_SHOW_FORM_UPDATE = "DEPARTMENT_SHOW_FORM_UPDATE";

export const showFormCreate = (show: boolean): DepartmentFormAction => ({
  type: DEPARTMENT_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: DepartmentEntity): DepartmentFormAction => ({
  type: DEPARTMENT_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

