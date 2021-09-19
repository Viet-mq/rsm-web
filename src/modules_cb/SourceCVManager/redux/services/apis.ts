import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {SourceCVEntity} from "../../types";

export const getListSourceCV = async (params: any): Promise<ListResponseBase2<SourceCVEntity>> => {
  const response = (await GET('api-svc/sourcecv/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createSourceCV = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/sourcecv/create', params)) as ResponseBase2;
};

export const deleteSourceCV = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/sourcecv/delete', params)) as ResponseBase2;
};

export const updateSourceCV = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/sourcecv/update', params)) as ResponseBase2;
};
