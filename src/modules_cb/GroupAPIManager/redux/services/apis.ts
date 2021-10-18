import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {GroupAPIEntity} from "../../types";

export const getListGroupAPI = async (params: any): Promise<ListResponseBase2<GroupAPIEntity>> => {
  const response = (await GET('acc-svc/api-role-group/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createGroupAPI = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role-group/create', params)) as ResponseBase2;
};

export const deleteGroupAPI = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role-group/delete', params)) as ResponseBase2;
};

export const updateGroupAPI = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role-group/update', params)) as ResponseBase2;
};

export const addAPI = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role-group/add-api', params)) as ResponseBase2;
};

export const removeAPI = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role-group/remove-api', params)) as ResponseBase2;
};

export const assignUser = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role-group/assign', params)) as ResponseBase2;
};

export const revokeUser = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/api-role-group/revoke', params)) as ResponseBase2;
};
