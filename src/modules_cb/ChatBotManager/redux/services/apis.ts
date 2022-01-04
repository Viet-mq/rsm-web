import {ListResponseBase2, ResponseBase2} from "../../../../models/common";
import {DELETE, GET, POST, PUT} from "../../../../services";
import {ChatBot} from "../../types";

export const createChatBot = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/chat-bot/create', params)) as ResponseBase2;
};

export const updateChatBot = async (params?: any): Promise<ResponseBase2> => {
  return (await PUT('api-svc/chat-bot/update', params)) as ResponseBase2;
};

export const deleteChatBot = async (params: any): Promise<ResponseBase2> => {
  return (await DELETE('api-svc/chat-bot/delete', params)) as ResponseBase2;
}

export const getListChatBots = async (params: any): Promise<ListResponseBase2<ChatBot>> => {
  const response = (await GET('api-svc/chat-bot/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};
