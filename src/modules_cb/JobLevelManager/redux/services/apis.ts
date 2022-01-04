import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {JobLevelEntity} from "../../types";

export const getListJobLevel = async (params: any): Promise<ListResponseBase2<JobLevelEntity>> => {
  const response = (await GET('api-svc/joblevel/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createJobLevel = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/joblevel/create', params)) as ResponseBase2;
};

export const deleteJobLevel = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/joblevel/delete', params)) as ResponseBase2;
};

export const updateJobLevel = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/joblevel/update', params)) as ResponseBase2;
};
