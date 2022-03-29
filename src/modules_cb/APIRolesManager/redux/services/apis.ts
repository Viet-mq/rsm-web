import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {APIRolesEntity} from "../../types";

export const getListAPIRoles = async (params: any): Promise<ListResponseBase2<APIRolesEntity>> => {
  const response = (await GET('api-svc/api-role/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const createAPIRoles = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/api-role/create', params)) as ResponseBase2;
};

export const deleteAPIRoles = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/api-role/delete', params)) as ResponseBase2;
};

export const updateAPIRoles = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/api-role/update', params)) as ResponseBase2;
};
