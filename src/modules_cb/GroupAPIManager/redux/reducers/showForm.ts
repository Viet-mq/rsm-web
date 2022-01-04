import * as Actions from "../actions";
import {GroupAPIEntity} from "../../types";
import {
  ShowGroupAPIAction
} from "../actions";

export interface ShowGroupAPIState {
  show_create?: boolean,
  show_update?: boolean,
  show_add_api?: boolean,
  show_assign_user?: boolean,
  view?: GroupAPIEntity|any
}

const initState: ShowGroupAPIState = {
  show_create: false,
  show_update: false,
  show_add_api: false,
  show_assign_user: false,
}

export default (state = initState, {type, show_create, show_update,show_add_api, show_assign_user, view}: ShowGroupAPIAction): ShowGroupAPIState => {
  switch (type) {
    case Actions.SHOW_CREATE_GROUP_API_FORM:
      return {
        ...state,
        show_create,
        show_update: false,
        show_add_api: false,
        show_assign_user: false,
      }
    case Actions.SHOW_UPDATE_GROUP_API_FORM:
      return {
        ...state,
        show_update,
        view,
        show_create: false,
        show_add_api: false,
        show_assign_user: false,
      }

    case Actions.SHOW_ADD_API_FORM:
      return {
        ...state,
        show_add_api,
        show_create: false,
        show_update: false,
        show_assign_user: false,
      }

      case Actions.SHOW_ADD_USER_FORM:
      return {
        ...state,
        show_assign_user,
        show_create: false,
        show_update: false,
        show_add_api: false,
      }
    default:
      return state;
  }
}
