import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {DELETE, GET, POST, PUT} from "src/services";
import {ScriptEntity} from "../../types";

export const getListScript = async (params: any): Promise<ListResponseBase2<ScriptEntity>> => {
  const response = (await GET('api-svc/scenario/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createScript = async (params: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/scenario', params)) as ResponseBase2;
}

export const updateScript = async (params: any): Promise<ResponseBase2> => {
  return (await PUT('api-svc/scenario', params)) as ResponseBase2;
}

export const deleteScript = async (params: any): Promise<ResponseBase2> => {
  return (await DELETE('api-svc/scenario', params)) as ResponseBase2;
}

export const addStepScript = async (params: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/step/create', params)) as ResponseBase2;
}

export const updateStepScript = async (params: any): Promise<ResponseBase2> => {
  return (await PUT('api-svc/step/delete', params)) as ResponseBase2;
}

export const removeStepScript = async (params: any): Promise<ResponseBase2> => {
  return (await DELETE('api-svc/step/delete', params)) as ResponseBase2;
}
