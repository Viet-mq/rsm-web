import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {AddressEntity} from "../../types";

export const getListAddress = async (params: any): Promise<ListResponseBase2<AddressEntity>> => {
  const response = (await GET('api-svc/address/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const createAddress = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/address/create', params)) as ResponseBase2;
};

export const deleteAddress = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/address/delete', params)) as ResponseBase2;
};

export const updateAddress = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/address/update', params)) as ResponseBase2;
};
