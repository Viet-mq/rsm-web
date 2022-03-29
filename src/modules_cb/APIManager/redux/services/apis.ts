import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {ApiEntity} from "../../types";

export const getListApi = async (params: any): Promise<ListResponseBase2<ApiEntity>> => {
  const response = (await GET('api-svc/api/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createApi = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/api/create', params)) as ResponseBase2;
};

export const deleteApi = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/api/delete', params)) as ResponseBase2;
};

export const updateApi = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/api/update', params)) as ResponseBase2;
};
