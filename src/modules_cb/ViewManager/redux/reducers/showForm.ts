import {UpdateActionToViewRequest, ViewEntity} from "../../types";
import * as Actions from "../actions";
import {ShowViewFormAction} from "../actions";

export interface ViewShowFormState {
  show_create?: boolean,
  show_update?: boolean,
  show_add_action?: boolean,
  show_update_action?: boolean,
  view?: ViewEntity,
  id_view?: string,
  actions?: UpdateActionToViewRequest,
}

const initState: ViewShowFormState = {
  show_create: false,
  show_update: false,
  show_add_action: false,
  show_update_action: false
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  show_add_action,
  show_update_action,
  id_view,
  actions,
  view
}: ShowViewFormAction): ViewShowFormState => {
  switch (type) {
    case Actions.SHOW_VIEW_CREATE_FORM:
      return {
        ...state,
        show_create,
        show_update: false,
        show_add_action: false
      }
    case Actions.SHOW_VIEW_UPDATE_FORM:
      return {
        ...state,
        show_update,
        view,
        show_create: false,
        show_add_action: false
      }

    case Actions.SHOW_VIEW_ADD_ACTION_FORM:
      return {
        ...state,
        show_add_action,
        id_view,
        show_create: false,
        show_update: false
      }

    case Actions.SHOW_VIEW_UPDATE_ACTION_FORM:
      return {
        ...state,
        show_update_action,
        actions,
        show_create: false,
        show_update: false
      }
    default:
      return state;
  }
}
