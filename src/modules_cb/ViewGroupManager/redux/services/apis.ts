import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {
  MenuFrontendEntity,
} from "../../types";
export const getListMenuFrontend = async (params: any): Promise<ListResponseBase2<MenuFrontendEntity>> => {
  const response = (await GET('acc-svc/menu-web/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const updateMenuFrontend = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/menu-web/update', params)) as ResponseBase2;
};

export const deleteMenuFrontend = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/menu-web/delete', params)) as ResponseBase2;
};

export const createMenuFrontend = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/menu-web/create', params)) as ResponseBase2;
};
