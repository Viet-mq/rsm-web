import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {TalentPoolEntity} from "../../types";

export const getListTalentPool = async (params: any): Promise<ListResponseBase2<TalentPoolEntity>> => {
  const response = (await GET('api-svc/talent-pool/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const updateTalentPool = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/talent-pool/update', params)) as ResponseBase2;
};

export const createTalentPool = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/talent-pool/create', params)) as ResponseBase2;
};

export const deleteTalentPool = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/talent-pool/delete', params)) as ResponseBase2;
};

