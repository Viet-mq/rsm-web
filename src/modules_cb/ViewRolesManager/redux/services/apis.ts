import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {ViewRolesEntity} from "../../types";

export const getListViewRoles = async (params: any): Promise<ListResponseBase2<ViewRolesEntity>> => {
  const response = (await GET('api-svc/view-role/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const createViewRoles = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/view-role/create', params)) as ResponseBase2;
};

export const deleteViewRoles = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/view-role/delete', params)) as ResponseBase2;
};

export const updateViewRoles = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/view-role/update', params)) as ResponseBase2;
};
