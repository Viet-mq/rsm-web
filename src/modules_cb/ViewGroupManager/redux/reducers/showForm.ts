import * as Actions from "../actions";
import {ShowFormMenuFrontendAction} from "../actions/showForm";
import {MenuFrontendEntity} from "../../types";

export interface ShowFormMenuFrontendState {
  show_create?: boolean,
  show_update?: boolean,
  show_detail?: boolean,
  show_action_view?: boolean,
  view?: MenuFrontendEntity,
  data_detail?:MenuFrontendEntity|any
}

const initState: ShowFormMenuFrontendState = {
  show_create: false,
  show_update: false,
  show_detail: false,
  show_action_view: false,

}

export default (state = initState, {
  type,
  show_create,
  show_update,
  show_detail,
  show_action_view,
  view,
  data_detail
}: ShowFormMenuFrontendAction): ShowFormMenuFrontendState => {
  switch (type) {
    case Actions.SHOW_FORM_MENU_FRONTEND_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
        show_detail: false,

      }
    case Actions.SHOW_FORM_MENU_FRONTEND_UPDATE:
      return {
        ...state,
        show_update,
        view,
        show_create: false,
        show_detail: false
      }

    case Actions.SHOW_FORM_MENU_FRONTEND_DETAIL:
      return {
        ...state,
        show_detail,
        view,
        show_create: false,
        show_update: false
      }
    case Actions.SHOW_FORM_ADD_ACTION_VIEW:
      return {
        ...state,
        show_action_view,
        data_detail,
        show_create: false,
        show_update: false,
        show_detail:false
      }
    default:
      return state;
  }
}
