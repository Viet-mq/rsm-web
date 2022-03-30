import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {RolesEntity} from "../../types";

export const getListRoles = async (params: any): Promise<ListResponseBase2<RolesEntity>> => {
  const response = (await GET('api-svc/role/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const createRoles = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/role/create', params)) as ResponseBase2;
};

export const deleteRoles = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/role/delete', params)) as ResponseBase2;
};

export const updateRoles = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/role/update', params)) as ResponseBase2;
};
