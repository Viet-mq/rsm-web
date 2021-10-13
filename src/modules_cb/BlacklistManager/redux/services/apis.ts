import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {BlacklistEntity} from "../../types";

export const getListBlacklist = async (params: any): Promise<ListResponseBase2<BlacklistEntity>> => {
  const response = (await GET('api-svc/blacklist/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createBlacklist = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/blacklist/create', params)) as ResponseBase2;
};

export const deleteBlacklist = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/blacklist/delete', params)) as ResponseBase2;
};

export const updateBlacklist = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/blacklist/update', params)) as ResponseBase2;
};
