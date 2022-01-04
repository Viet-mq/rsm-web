import {ListResponseBase2, ResponseBase2} from "../../../models/common";
import {DELETE, GET, POST, PUT} from "../../../services";
import {IntentEntity} from "../types";

export const getListIntent = async (params: any): Promise<ListResponseBase2<IntentEntity>> => {
  const response = (await GET('api-svc/intent/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createChatBotIntent = async (params: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/intent/create', params)) as ResponseBase2;
}

export const updateChatBotIntent = async (params: any): Promise<ResponseBase2> => {
  return (await PUT('api-svc/intent/update', params)) as ResponseBase2;
}

export const deleteChatBotIntent = async (params: any): Promise<ResponseBase2> => {
  return (await DELETE('api-svc/intent/delete', params)) as ResponseBase2;
}
