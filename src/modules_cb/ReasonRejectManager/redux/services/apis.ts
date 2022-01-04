import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {ReasonRejectEntity} from "../../types";

export const getListReasonReject = async (params: any): Promise<ListResponseBase2<ReasonRejectEntity>> => {
  const response = (await GET('api-svc/reason/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const createReasonReject = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/reason/create', params)) as ResponseBase2;
};

export const deleteReasonReject = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/reason/delete', params)) as ResponseBase2;
};

export const updateReasonReject = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/reason/update', params)) as ResponseBase2;
};
