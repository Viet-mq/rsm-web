import {UpdateEntityRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export const UPDATE_CHAT_BOT_ENTITY = "UPDATE_CHAT_BOT_ENTITY";
export const UPDATE_CHAT_BOT_ENTITY_SUCCESS = "UPDATE_CHAT_BOT_ENTITY_SUCCESS";
export const UPDATE_CHAT_BOT_ENTITY_ERROR = "UPDATE_CHAT_BOT_ENTITY_ERROR";

export interface UpdateEntityAction {
  type: string,
  params?: UpdateEntityRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const updateChatBotEntity = (params: UpdateEntityRequest): UpdateEntityAction => ({
  type: UPDATE_CHAT_BOT_ENTITY,
  params
});

export const updateChatBotEntitySuccess = (response: ResponseBase2): UpdateEntityAction => ({
  type: UPDATE_CHAT_BOT_ENTITY_SUCCESS,
  response
});

export const updateChatBotEntityError = (error: AppError): UpdateEntityAction => ({
  type: UPDATE_CHAT_BOT_ENTITY_ERROR,
  error
});
