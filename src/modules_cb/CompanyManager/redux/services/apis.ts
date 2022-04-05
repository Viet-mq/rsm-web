import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {CompanyEntity} from "../../types";

export const getListCompany = async (params: any): Promise<ListResponseBase2<CompanyEntity>> => {
  const response = (await GET('api-svc/organization/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const createCompany = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/organization/create', params)) as ResponseBase2;
};

export const deleteCompany = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/organization/delete', params)) as ResponseBase2;
};

export const updateCompany = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/organization/update', params)) as ResponseBase2;
};
