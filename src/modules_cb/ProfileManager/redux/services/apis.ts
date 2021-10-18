import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST, POSTIMAGE} from "src/services";
import {ProfileEntity} from "../../types";

export const getListProfile = async (params: any): Promise<ListResponseBase2<ProfileEntity>> => {
  const response = (await GET('api-svc/profile/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createProfile = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/profile/create', params)) as ResponseBase2;
};

export const deleteProfile = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/profile/delete', params)) as ResponseBase2;
};

export const updateProfile = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/profile/update', params)) as ResponseBase2;
};

export const updateCV = async (file: any, profileId: any) => {
  let formData = new FormData();
  formData.append('image', file);
  formData.append('profile_id', profileId);
  return POSTIMAGE('upload-svc/upload/upload-cv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getDetailProfile = async (params?: any): Promise<ResponseBase2> => {
  return (await GET('api-svc/profile/detail', params)) as ResponseBase2;
};

export const updateDetail = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/profile/update-detail', params)) as ResponseBase2;
};

export const createBooking = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/calendar/create', params)) as ResponseBase2;
};

export const updateBooking = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/calendar/update', params)) as ResponseBase2;
};

export const getBooking = async (params?: any): Promise<ResponseBase2> => {
  return (await GET('api-svc/calendar/list', params)) as ResponseBase2;
};

export const getActivityLogs = async (params?: any): Promise<ResponseBase2> => {
  return (await GET('api-svc/history/list', params)) as ResponseBase2;
};

export const getElasticSearch = async (params?: any): Promise<ResponseBase2> => {
  return (await GET('upload-svc/upload/view', params)) as ResponseBase2;
};
