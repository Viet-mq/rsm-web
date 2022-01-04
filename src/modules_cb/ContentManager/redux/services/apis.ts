import {ListResponseBase2} from "src/models/common";
import {GET} from "src/services";
import {ChatBotContent} from "../../types";

export const getListChatBotContent = async (params: any): Promise<ListResponseBase2<ChatBotContent>> => {
  const response = (await GET('api-svc/content/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};
