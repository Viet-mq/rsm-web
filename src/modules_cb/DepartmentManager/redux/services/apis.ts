import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {DepartmentEntity} from "../../types";

export const getListDepartment = async (params: any): Promise<ListResponseBase2<DepartmentEntity>> => {
  const response = (await GET('api-svc/department/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createDepartment = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/department/create', params)) as ResponseBase2;
};

export const deleteDepartment = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/department/delete', params)) as ResponseBase2;
};

export const updateDepartment = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/department/update', params)) as ResponseBase2;
};
