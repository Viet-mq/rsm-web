import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {ApiRoleGroupEntity} from "../../types";

export const getListGroupApiRole = async (params: any): Promise<ListResponseBase2<ApiRoleGroupEntity>> => {
  const response = (await GET('acc-svc/api-role-group/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createGroupApiRole = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role-group/create', params)) as ResponseBase2;
};

export const deleteGroupApiRole = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role-group/delete', params)) as ResponseBase2;
};

export const updateGroupApiRole = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role-group/update', params)) as ResponseBase2;
};
