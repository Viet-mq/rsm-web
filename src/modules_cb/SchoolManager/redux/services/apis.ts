import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {SchoolEntity} from "../../types";

export const getListSchool = async (params: any): Promise<ListResponseBase2<SchoolEntity>> => {
  const response = (await GET('api-svc/school/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createSchool = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/school/create', params)) as ResponseBase2;
};

export const deleteSchool = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/school/delete', params)) as ResponseBase2;
};

export const updateSchool = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/school/update', params)) as ResponseBase2;
};
