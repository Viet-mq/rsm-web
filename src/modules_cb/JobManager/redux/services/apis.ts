import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {JobEntity} from "../../types";

export const getListJob = async (params: any): Promise<ListResponseBase2<JobEntity>> => {
  const response = (await GET('api-svc/job/list', params)) as any;
  console.log("api")
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createJob = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/job/create', params)) as ResponseBase2;
};

export const deleteJob = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/job/delete', params)) as ResponseBase2;
};

export const updateJob = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/job/update', params)) as ResponseBase2;
};
