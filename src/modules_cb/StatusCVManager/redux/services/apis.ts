import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {StatusCVEntity} from "../../types";

export const getListStatusCV = async (params: any): Promise<ListResponseBase2<StatusCVEntity>> => {
  const response = (await GET('api-svc/statuscv/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createStatusCV = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/statuscv/create', params)) as ResponseBase2;
};

export const deleteStatusCV = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/statuscv/delete', params)) as ResponseBase2;
};

export const updateStatusCV = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/statuscv/update', params)) as ResponseBase2;
};


export const updateAllStatusCV = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/statuscv/update-all', params)) as ResponseBase2;
};
