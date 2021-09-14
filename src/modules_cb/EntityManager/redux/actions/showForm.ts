import {ChatBotEntity} from "../services/apis";

export interface EntityFormAction {
  type: string,
  showCreate: boolean,
  showUpdate: boolean,
  entity?: ChatBotEntity
}

// create
export const SHOW_FORM_CREATE_CHAT_BOT_ENTITY = "SHOW_FORM_CREATE_CHAT_BOT_ENTITY";
export const HIDE_FORM_CREATE_CHAT_BOT_ENTITY = "HIDE_FORM_CREATE_CHAT_BOT_ENTITY";

export const showFormCreateChatBotEntity = (): EntityFormAction => ({
  type: SHOW_FORM_CREATE_CHAT_BOT_ENTITY,
  showCreate: true,
  showUpdate: false
});

export const hideFormCreateChatBotEntity = (): EntityFormAction => ({
  type: HIDE_FORM_CREATE_CHAT_BOT_ENTITY,
  showCreate: false,
  showUpdate: false
});

// update
export const SHOW_FORM_UPDATE_CHAT_BOT_ENTITY = "SHOW_FORM_UPDATE_CHAT_BOT_ENTITY";
export const HIDE_FORM_UPDATE_CHAT_BOT_ENTITY = "HIDE_FORM_UPDATE_CHAT_BOT_ENTITY";

export const showFormUpdateChatBotEntity = (entity: ChatBotEntity): EntityFormAction => ({
  type: SHOW_FORM_UPDATE_CHAT_BOT_ENTITY,
  showCreate: false,
  showUpdate: true,
  entity: entity
});

export const hideFormUpdateChatBotEntity = (): EntityFormAction => ({
  type: HIDE_FORM_UPDATE_CHAT_BOT_ENTITY,
  showCreate: false,
  showUpdate: false
});
