import {ScriptEntity} from "../../types";
import * as Actions from "../actions";
import {ScriptShowFormAction} from "../actions";

export interface ScriptShowFormState {
  show_create?: boolean,
  show_update?: boolean,
  show_add_step?: boolean,
  show_upload?: boolean,
  entity?: ScriptEntity
}

const initState: ScriptShowFormState = {
  show_create: false,
  show_update: false,
  show_add_step: false,
  show_upload: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  show_add_step,
  show_upload,
  entity
}: ScriptShowFormAction): ScriptShowFormState => {
  switch (type) {
    case Actions.SCRIPT_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
        show_add_step: false,
        show_upload: false,
      }
    case Actions.SCRIPT_SHOW_FORM_UPDATE:
      return {
        ...state,
        entity,
        show_update,
        show_create: false,
        show_add_step: false,
        show_upload: false,
      }
    case Actions.SCRIPT_SHOW_FORM_ADD_STEP:
      return {
        ...state,
        entity,
        show_add_step,
        show_update: false,
        show_create: false,
        show_upload: false,
      }
    case Actions.SCRIPT_SHOW_FORM_UPLOAD:
      return {
        ...state,
        show_upload,
        show_add_step: false,
        show_update: false,
        show_create: false
      }
    default:
      return state;
  }
}
