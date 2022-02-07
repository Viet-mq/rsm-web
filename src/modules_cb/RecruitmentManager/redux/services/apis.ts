import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {RecruitmentEntity} from "../../types";
import {UserAccount} from "../../../AccountManager/types";

export const getListRecruitment = async (params: any): Promise<ListResponseBase2<RecruitmentEntity>> => {
  const response = (await GET('api-svc/recruitment/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const searchUserRecruitment= async (params: any): Promise<ListResponseBase2<UserAccount>> => {
  const response = (await GET('acc-svc/account/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createRecruitment = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/recruitment/create', params)) as ResponseBase2;
};

export const deleteRecruitment = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/recruitment/delete', params)) as ResponseBase2;
};
export const deleteProcess = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/recruitment/delete-status', params)) as ResponseBase2;
};

export const updateRecruitment = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/recruitment/update', params)) as ResponseBase2;
};

export const createInterviewProcess = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/id/create', params)) as ResponseBase2;
};
