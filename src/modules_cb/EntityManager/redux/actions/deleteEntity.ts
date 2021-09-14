import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteEntityAction {
  type: string,
  entityId?: string,
  response?: ResponseBase2,
  error?: AppError
}

export const ENTITY_CHAT_BOT_DELETE = "ENTITY_CHAT_BOT_DELETE";
export const ENTITY_CHAT_BOT_DELETE_SUCCESS = "ENTITY_CHAT_BOT_DELETE_SUCCESS";
export const ENTITY_CHAT_BOT_DELETE_ERROR = "ENTITY_CHAT_BOT_DELETE_ERROR";

export const deleteChatBotEntity = (entityId: string): DeleteEntityAction => ({
  type: ENTITY_CHAT_BOT_DELETE,
  entityId
});

export const deleteChatBotEntitySuccess = (response: ResponseBase2): DeleteEntityAction => ({
  type: ENTITY_CHAT_BOT_DELETE_SUCCESS,
  response
});

export const deleteChatBotEntityError = (error: AppError): DeleteEntityAction => ({
  type: ENTITY_CHAT_BOT_DELETE_ERROR,
  error
});
