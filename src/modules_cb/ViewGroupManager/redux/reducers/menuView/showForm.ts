import * as Actions from "../../actions";
import {ShowFormMenuFrontendAction} from "../../actions/menuView/showForm";
import {MenuFrontendEntity} from "../../../types";

export interface ShowFormMenuFrontendState {
  show_create?: boolean,
  show_update?: boolean,
  show_detail?: boolean,
  view?: MenuFrontendEntity
}

const initState: ShowFormMenuFrontendState = {
  show_create: false,
  show_update: false,
  show_detail: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  show_detail,
  view
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
        show_update:false
      }
    default:
      return state;
  }
}
