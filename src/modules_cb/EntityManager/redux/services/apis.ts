import {EntityListParams} from "../actions";
import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {DELETE, GET, POST, PUT} from "src/services";

export interface ChatBotEntity {
  entity_id: string,
  chatbot_id: string,
  chatbot_name: string,
  entity_name: string,
  entity_type: string,
  keyword: string,
  synonymsOfKeyword: string[],
  create_at: number,
  update_at: number,
  create_by: string,
  update_by: string,
}

export const getListChatBotEntity = async (params: EntityListParams): Promise<ListResponseBase2<ChatBotEntity>> => {
  const response = (await GET('api-svc/entity/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createChatBotEntity = async (params: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/entity/create', params)) as ResponseBase2;
}

export const deleteChatBotEntity = async (params: any): Promise<ResponseBase2> => {
  return (await DELETE('api-svc/entity/delete', params)) as ResponseBase2;
}

export const updateChatBotEntity = async (params: any): Promise<ResponseBase2> => {
  return (await PUT('api-svc/entity/update', params)) as ResponseBase2;
}
