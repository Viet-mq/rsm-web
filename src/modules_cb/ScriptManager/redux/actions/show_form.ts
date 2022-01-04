import {ScriptEntity} from "../../types";

export interface ScriptShowFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  entity?: ScriptEntity,
  show_add_step?: boolean,
  show_upload?: boolean,
}

export const SCRIPT_SHOW_FORM_CREATE = "SCRIPT_SHOW_FORM_CREATE";
export const SCRIPT_SHOW_FORM_UPDATE = "SCRIPT_SHOW_FORM_UPDATE";
export const SCRIPT_SHOW_FORM_ADD_STEP = "SCRIPT_SHOW_FORM_ADD_STEP";
export const SCRIPT_SHOW_FORM_UPLOAD = "SCRIPT_SHOW_FORM_UPLOAD";

export const showFormCreateScript = (show_create: boolean): ScriptShowFormAction => ({
  type: SCRIPT_SHOW_FORM_CREATE,
  show_create
});

export const showFormUpdateScript = (show_create: boolean, entity?: ScriptEntity): ScriptShowFormAction => ({
  type: SCRIPT_SHOW_FORM_UPDATE,
  show_create,
  entity
});

export const showFormUpdateAddStep = (show_add_step: boolean, entity?: ScriptEntity): ScriptShowFormAction => ({
  type: SCRIPT_SHOW_FORM_ADD_STEP,
  show_add_step,
  entity
});

export const showFormUpLoadScript = (show_upload: boolean): ScriptShowFormAction => ({
  type: SCRIPT_SHOW_FORM_UPLOAD,
  show_upload,
});
