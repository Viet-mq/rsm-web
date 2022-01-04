import {DeleteChatBotIntentRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteIntentAction {
  type: string,
  request?: DeleteChatBotIntentRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const INTENT_DELETE = "INTENT_DELETE";
export const INTENT_DELETE_SUCCESS = "INTENT_DELETE_SUCCESS";
export const INTENT_DELETE_ERROR = "INTENT_DELETE_ERROR";

export const deleteChatBotIntent = (request?: DeleteChatBotIntentRequest): DeleteIntentAction => ({
  type: INTENT_DELETE,
  request
});

export const deleteChatBotIntentSuccess = (response?: ResponseBase2): DeleteIntentAction => ({
  type: INTENT_DELETE_SUCCESS,
  response
});

export const deleteChatBotIntentError = (error?: AppError): DeleteIntentAction => ({
  type: INTENT_DELETE_ERROR,
  error
});
