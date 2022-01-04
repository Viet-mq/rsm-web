import {ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";

export const createSchedule = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/calendars/create', params)) as ResponseBase2;
};

export const updateSchedule = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/calendar/update', params)) as ResponseBase2;
};

export const deleteSchedule = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/calendar/delete', params)) as ResponseBase2;
};

export const getAllSchedule = async (params?: any): Promise<ResponseBase2> => {
  return (await GET('api-svc/calendar/list', params)) as ResponseBase2;
};
