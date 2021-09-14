import {ChatBot} from "../../types";
import * as Actions from "../actions";
import {SelectedBotAction} from "../actions";

export interface SelectedBotState {
  bot_id?: string,
  bot_entity?: ChatBot
}

const initState: SelectedBotState = {
  bot_id: "",
}

export default (state = initState, {type, bot_id, bot_entity}: SelectedBotAction): SelectedBotState => {
  switch (type) {
    case Actions.CHAT_BOT_SELECTED:
      return {
        ...state,
        bot_id,
        bot_entity
      }
    default:
      return state;
  }
}
