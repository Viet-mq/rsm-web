export interface CreateEntityRequest {
  chatbot_id: string,
  entity_name: string,
  keyword: string,
}

export interface UpdateEntityRequest extends CreateEntityRequest {
  entity_id: string,
  synonyms_of_keyword: string[]
}

export interface DeleteEntityRequest {
  entity_id: string
}
