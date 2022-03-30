import {ApiEntity} from "../../types";
import *as Actions from "../actions";
import {ShowFormAPIAction} from "../actions";

export interface ShowFormAPIState {
  show_create?: boolean,
  show_update?: boolean,
  entity?: ApiEntity
}

const initState: ShowFormAPIState = {
  show_create: false,
  show_update: false
}

export default (state = initState, {type, show_create, show_update, entity}: ShowFormAPIAction): ShowFormAPIState => {
  switch (type) {
    case Actions.SHOW_FORM_CREATE_API:
      return {
        ...state,
        show_create,
        show_update: false
      }
    case Actions.SHOW_FORM_UPDATE_API:
      return {
        ...state,
        show_update,
        entity,
        show_create: false
      }
    default:
      return state;
  }
}
