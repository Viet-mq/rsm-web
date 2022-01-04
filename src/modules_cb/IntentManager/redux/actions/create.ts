import {CreateChatBotIntentRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateIntentAction {
  type: string,
  request?: CreateChatBotIntentRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const INTENT_CREATE = "INTENT_CREATE";
export const INTENT_CREATE_SUCCESS = "INTENT_CREATE_SUCCESS";
export const INTENT_CREATE_ERROR = "INTENT_CREATE_ERROR";

export const createChatBotIntent = (request?: CreateChatBotIntentRequest): CreateIntentAction => ({
  type: INTENT_CREATE,
  request
});

export const createChatBotIntentSuccess = (response?: ResponseBase2): CreateIntentAction => ({
  type: INTENT_CREATE_SUCCESS,
  response
});

export const createChatBotIntentError = (error?: AppError): CreateIntentAction => ({
  type: INTENT_CREATE_ERROR,
  error
});
