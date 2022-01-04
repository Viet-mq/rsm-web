import {ChatBotEntity} from "../services/apis";
import * as Actions from "../actions";
import {EntityFormAction} from "../actions";

export interface EntityFormState {
  showCreate?: boolean,
  showUpdate?: boolean,
  entity?: ChatBotEntity
}

const initState: EntityFormState = {
  showCreate: false,
  showUpdate: false
}

export default (state = initState, {type, showCreate, showUpdate, entity}: EntityFormAction): EntityFormState => {
  switch (type) {
    case Actions.SHOW_FORM_CREATE_CHAT_BOT_ENTITY:
    case Actions.HIDE_FORM_CREATE_CHAT_BOT_ENTITY:
      return {
        ...state,
        showCreate,
      }
    case Actions.SHOW_FORM_UPDATE_CHAT_BOT_ENTITY:
      return {
        ...state,
        showUpdate,
        entity
      }
    case Actions.HIDE_FORM_UPDATE_CHAT_BOT_ENTITY:
      return {
        ...state,
        showUpdate,
      }
  }
  return state;
}
