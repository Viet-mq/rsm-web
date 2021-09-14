import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {ApiRoleEntity} from "../../types";

export const getListApiRole = async (params: any): Promise<ListResponseBase2<ApiRoleEntity>> => {
  const response = (await GET('acc-svc/api-role/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createApiRole = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role/create', params)) as ResponseBase2;
};

export const deleteApiRole = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role/delete', params)) as ResponseBase2;
};

export const updateApiRole = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role/update', params)) as ResponseBase2;
};
