export interface ChatBotContent {
  content_id: string,
  chatbot_id: string,
  sample_content: string,
  synonyms_of_sample_content: string[],
  intent_name: string,
  keywords_and_entities: any[],
  create_at: number,
  update_at: number,
  create_by: string,
  update_by: string,
}

export interface CreateContentReq {

}
