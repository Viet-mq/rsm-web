import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {FrontendViewEntity} from "../../types";

export const getListViewFrontEnd = async (params: any): Promise<ListResponseBase2<FrontendViewEntity>> => {
  const response = (await GET('acc-svc/frontend-view/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createViewFrontEnd = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/frontend-view/create', params)) as ResponseBase2;
};

export const deleteViewFrontEnd = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/frontend-view/delete', params)) as ResponseBase2;
};

export const updateViewFrontEnd = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/frontend-view/update', params)) as ResponseBase2;
};

export const addActionViewFrontEnd = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/frontend-view/add-action', params)) as ResponseBase2;
};

export const removeActionViewFrontEnd = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/frontend-view/remove-action', params)) as ResponseBase2;
};
