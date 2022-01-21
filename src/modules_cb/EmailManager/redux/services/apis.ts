import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {EmailEntity} from "../../types";


export const getListEmail = async (params: any): Promise<ListResponseBase2<EmailEntity>> => {
  const response = (await GET('upload-svc/template/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const createEmail = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('upload-svc/template/create', params)) as ResponseBase2;
};

export const updateEmail = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('upload-svc/template/update', params)) as ResponseBase2;
};

export const deleteJob = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/job/delete', params)) as ResponseBase2;
};
