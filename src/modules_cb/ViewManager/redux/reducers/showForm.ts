import {FrontendViewEntity} from "../../types";
import * as Actions from "../actions";
import {VIEW_FRONT_END_SHOW_ADD_ACTION_FORM, ViewShowFormAction} from "../actions";

export interface ViewShowFormState {
  show_create?: boolean,
  show_update?: boolean,
  show_add_action?: boolean,
  view?: FrontendViewEntity
}

const initState: ViewShowFormState = {
  show_create: false,
  show_update: false,
  show_add_action: false
}

export default (state = initState, {type, show_create, show_update, show_add_action, view}: ViewShowFormAction): ViewShowFormState => {
  switch (type) {
    case Actions.VIEW_FRONT_END_SHOW_CREATE_FORM:
      return {
        ...state,
        show_create,
        show_update: false,
        show_add_action: false
      }
    case Actions.VIEW_FRONT_END_SHOW_UPDATE_FORM:
      return {
        ...state,
        show_update,
        view,
        show_create: false,
        show_add_action: false
      }

    case Actions.VIEW_FRONT_END_SHOW_ADD_ACTION_FORM:
      return {
        ...state,
        show_add_action,
        view,
        show_create: false,
        show_update: false
      }
    default:
      return state;
  }
}
