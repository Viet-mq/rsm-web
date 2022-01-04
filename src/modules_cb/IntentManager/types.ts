export interface IntentEntity {
  "intent_id": string,
  "chatbot_id": string,
  "chatbot_name": string,
  "intent_name": string,
  "sample_content": string,
  "create_at": number,
  "update_at": number,
  "create_by": string,
  "update_by": string,
}

export interface CreateChatBotIntentRequest {
  chatbot_id: string,
  intent_name: string,
  sample_content: string,
}

export interface UpdateChatBotIntentRequest {
  intent_id: string,
  chatbot_id: string,
  intent_name: string,
  sample_content: string,
}

export interface DeleteChatBotIntentRequest {
  intent_id: string
}
