import {CreateEntityRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export const CREATE_CHAT_BOT_ENTITY = "CREATE_CHAT_BOT_ENTITY";
export const CREATE_CHAT_BOT_ENTITY_SUCCESS = "CREATE_CHAT_BOT_ENTITY_SUCCESS";
export const CREATE_CHAT_BOT_ENTITY_ERROR = "CREATE_CHAT_BOT_ENTITY_ERROR";

export interface CreateEntityAction {
  type: string,
  params?: CreateEntityRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const createChatBotEntity = (params: CreateEntityRequest): CreateEntityAction => ({
  type: CREATE_CHAT_BOT_ENTITY,
  params
});

export const createChatBotEntitySuccess = (response: ResponseBase2): CreateEntityAction => ({
  type: CREATE_CHAT_BOT_ENTITY_SUCCESS,
  response
});

export const createChatBotEntityError = (error: AppError): CreateEntityAction => ({
  type: CREATE_CHAT_BOT_ENTITY_ERROR,
  error
});
