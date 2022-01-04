import {ChatBot} from "../../types";

export interface SelectedBotAction {
  type: string,
  bot_id?: string,
  bot_entity?: ChatBot
}

export const CHAT_BOT_SELECTED = "CHAT_BOT_SELECTED";

export const chatBotSelected = (bot_id: string, bot_entity?: ChatBot): SelectedBotAction => ({
  type: CHAT_BOT_SELECTED,
  bot_id,
  bot_entity
});
