import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {UserAccount} from "../../types";

export const getListAccount = async (params: any): Promise<ListResponseBase2<UserAccount>> => {
  const response = (await GET('acc-svc/account/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createAccount = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/account/create-account', params)) as ResponseBase2;
};

export const deleteAccount = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/account/delete-account', params)) as ResponseBase2;
};

export const updateAccount = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/account/update-account', params)) as ResponseBase2;
};

export const changePasswordAccount = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('acc-svc/account/change-acc-password', params)) as ResponseBase2;
};
