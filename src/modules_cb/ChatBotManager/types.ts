export interface CreateChatBotReq {
  chatbot_name: string,
  chatbot_language_id: number,
  chatbot_description: string,
}

export interface UpdateChatBotReq extends CreateChatBotReq {
  chatbot_id: string
}

export interface ChatBot {
  chatbot_id: string,
  chatbot_name: string,
  chatbot_language_id: number,
  chatbot_description: string,
  active_status: number,
  training_status: number,
  create_at: number,
  update_at: number,
  create_by: string,
  update_by: string,
}
