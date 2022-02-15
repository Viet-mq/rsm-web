import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {ReminderEntity} from "../../types";


export const getListReminder = async (params: any): Promise<ListResponseBase2<ReminderEntity>> => {
  const response = (await GET('api-svc/reminder/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createReminder = async (params?: any) => {
  return (await POST('api-svc/reminder/create', params)) as ResponseBase2;

};

export const deleteReminder = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/reminder/delete', params)) as ResponseBase2;
};

export const updateReminder = async (params?: any) => {
  return (await POST('api-svc/reminder/update', params)) as ResponseBase2;

};

