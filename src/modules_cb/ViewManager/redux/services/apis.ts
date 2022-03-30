import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {ViewEntity} from "../../types";

export const getListView = async (params: any): Promise<ListResponseBase2<ViewEntity>> => {
  const response = (await GET('api-svc/permission/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createView = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/permission/create', params)) as ResponseBase2;
};

export const deleteView = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/permission/delete', params)) as ResponseBase2;
};

export const updateView = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/permission/update', params)) as ResponseBase2;
};

export const addActionView = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/action/create', params)) as ResponseBase2;
};

export const updateActionView = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/action/update', params)) as ResponseBase2;
};

export const removeActionView = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/action/delete', params)) as ResponseBase2;
};
