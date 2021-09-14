import * as Actions from '../actions'
import {ShowFormCreateChatBotAction} from '../actions'
import {ChatBot} from "../../types";

export interface CreateFormState {
  visible: boolean,
  visibleUpdate: boolean,
  chatBot?: ChatBot
}

const initState: CreateFormState = {
  visible: false,
  visibleUpdate: false,
}

export default (state = initState, {type, visible, chatBot}: ShowFormCreateChatBotAction): CreateFormState => {
  switch (type) {
    case Actions.SHOW_FORM_CREATE:
    case Actions.HIDE_FORM_CREATE:
      return {
        ...state,
        visible: visible,
        visibleUpdate: false
      }
    case Actions.HIDE_FORM_UPDATE:
      return {
        ...state,
        visible: false,
        visibleUpdate: visible
      }
    case Actions.SHOW_FORM_UPDATE:
      return {
        ...state,
        visible: false,
        visibleUpdate: visible,
        chatBot: chatBot
      }
    default:
      return state;
  }
}

