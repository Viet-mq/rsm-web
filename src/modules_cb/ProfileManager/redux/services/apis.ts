import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {EXPORT, GET, POST, POSTIMAGE} from "src/services";
import {NoteEntity, ProfileEntity, UploadAvatarRequest} from "../../types";

export const getListProfile = async (params: any): Promise<ListResponseBase2<ProfileEntity>> => {
  let url = "api-svc/profile/list?"
  if (params.fullName !== null && params.fullName !== undefined) {
    console.log(params.fullName)
    url += "fullName=" + params.fullName + "&"
  }
  if (params.calendar !== null && params.calendar !== undefined) {
    url += "calendar=" + params.calendar + "&"
  }
  if (params.job !== null && params.job !== undefined) {
    url += "job=" + params.job + "&"
  }
  if (params.levelJob !== null && params.levelJob !== undefined) {
    url += "levelJob=" + params.levelJob + "&"
  }
  if (params.department !== null && params.department !== undefined) {
    url += "department=" + params.department + "&"
  }
  if (params.talentPool !== null && params.talentPool !== undefined) {
    url += "talentPool=" + params.talentPool + "&"
  }
  if (params.recruitment !== null && params.recruitment !== undefined) {
    url += "recruitment=" + params.recruitment + "&"
  }
  if (params.statusCV !== null && params.statusCV !== undefined) {
    url += "statusCV=" + params.statusCV + "&"
  }
  if (params.page !== null && params.page !== undefined) {
    url += "page=" + params.page + "&"
  }
  if (params.size !== null && params.size !== undefined) {
    url += "size=" + params.size
  }
  const response = (await GET(url,)) as any;
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

export const createRejectCandidate = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/profile/reject', params)) as ResponseBase2;
};
export const changeProcess = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/profile/change', params)) as ResponseBase2;
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

export const uploadListCV = async (file: any) => {
  let formData = new FormData();
  formData.append('file', file);
  return POSTIMAGE('api-svc/profiles/upload', formData, {
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

export const getListNote = async (params: any): Promise<ListResponseBase2<NoteEntity>> => {
  const response = (await GET('api-svc/note/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  };
};

export const createNote = async (params?: any) => {
  let formData = new FormData();
  if (params.file != null)
    formData.append('file', params.file);
  formData.append('idProfile', params.idProfile);
  formData.append('username', params.username);
  formData.append('comment', params.comment);
  formData.append('evaluation', params.evaluation);
  return POSTIMAGE('api-svc/note/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
};

export const deleteNote = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/note/delete', params)) as ResponseBase2;
};

export const updateNote = async (params?: any) => {
  let formData = new FormData();
  if (params.file != null)
    formData.append('file', params.file);
  formData.append('id', params.id);
  formData.append('username', params.username);
  formData.append('comment', params.comment);
  formData.append('evaluation', params.evaluation);
  return POSTIMAGE('api-svc/note/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
};

export const downloadCVNote = async (params?: any): Promise<ResponseBase2> => {
  console.log(`api-svc/note/export/file/${params}`)
  return (await GET(`api-svc/note/export/file/${params}`)) as ResponseBase2;
};
export const exportExcelFile = async (params?: any): Promise<ResponseBase2> => {
  return (await EXPORT('api-svc/excel/export', params)) as ResponseBase2;
};

export const uploadAvatar = async (params?: UploadAvatarRequest) => {
  let formData = new FormData();
  formData.append('image', params?.image);
  formData.append('idProfile', params?.profileId);
  return POSTIMAGE('api-svc/image/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
