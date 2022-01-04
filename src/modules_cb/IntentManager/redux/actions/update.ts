import {UpdateChatBotIntentRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateIntentAction {
  type: string,
  request?: UpdateChatBotIntentRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const INTENT_UPDATE = "INTENT_UPDATE";
export const INTENT_UPDATE_SUCCESS = "INTENT_UPDATE_SUCCESS";
export const INTENT_UPDATE_ERROR = "INTENT_UPDATE_ERROR";

export const updateChatBotIntent = (request?: UpdateChatBotIntentRequest): UpdateIntentAction => ({
  type: INTENT_UPDATE,
  request
});

export const updateChatBotIntentSuccess = (response?: ResponseBase2): UpdateIntentAction => ({
  type: INTENT_UPDATE_SUCCESS,
  response
});

export const updateChatBotIntentError = (error?: AppError): UpdateIntentAction => ({
  type: INTENT_UPDATE_ERROR,
  error
});
