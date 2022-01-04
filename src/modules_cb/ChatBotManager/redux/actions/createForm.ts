import {ChatBot} from "../../types";

export const SHOW_FORM_CREATE = 'SHOW_FORM_CREATE';
export const HIDE_FORM_CREATE = 'HIDE_FORM_CREATE';

export interface ShowFormCreateChatBotAction {
  type: string,
  visible: boolean,
  chatBot?: ChatBot
}

export const hideCreateChatBotForm = (): ShowFormCreateChatBotAction => ({
  type: HIDE_FORM_CREATE,
  visible: false,
});

export const showCreateChatBotForm = (): ShowFormCreateChatBotAction => ({
  type: SHOW_FORM_CREATE,
  visible: true,
});

//
export const HIDE_FORM_UPDATE = 'HIDE_FORM_UPDATE';
export const SHOW_FORM_UPDATE = 'SHOW_FORM_UPDATE';

export const hideUpdateChatBotForm = (): ShowFormCreateChatBotAction => ({
  type: HIDE_FORM_UPDATE,
  visible: false,
});

export const showUpdateChatBotForm = (chatBot: ChatBot): ShowFormCreateChatBotAction => ({
  type: SHOW_FORM_UPDATE,
  visible: true,
  chatBot: chatBot
});
