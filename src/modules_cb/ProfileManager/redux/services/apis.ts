import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {EXPORT, GET, POST, POSTIMAGE} from "src/services";
import {
  ChangeProcessRequest,
  CreateBookingRequest,
  CreateRejectCandidateRequest,
  NoteEntity,
  ProfileEntity,
  UpdateBookingRequest,
  UploadAvatarRequest
} from "../../types";

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


export const changeProcess = async (params?: ChangeProcessRequest): Promise<ResponseBase2> => {
  let formData:any = new FormData();
  if(params?.mailRequest?.candidate?.content) formData.append('contentCandidate', params?.mailRequest.candidate?.content);
  if(params?.mailRequest?.presenters?.content) formData.append('contentPresenter',  params?.mailRequest.presenters?.content);
  if(params?.mailRequest?.candidate?.file) formData.append('fileCandidates',  params?.mailRequest.candidate?.file);
  if(params?.mailRequest?.presenters?.file) formData.append('filePresenters', params?.mailRequest.presenters?.file);
  if(params?.changeProcess.idProfile) formData.append('idProfile', params?.changeProcess.idProfile);
  if( params?.changeProcess.statusCVId) formData.append('statusCVId', params?.changeProcess.statusCVId);
  if(params?.changeProcess.recruitmentId) formData.append('recruitmentId', params?.changeProcess.recruitmentId);
  if(params?.mailRequest?.candidate?.subject) formData.append('subjectCandidate',  params?.mailRequest.candidate?.subject);
  if(params?.mailRequest?.presenters?.subject) formData.append('subjectPresenter', params?.mailRequest.presenters?.subject);
  return POSTIMAGE('api-svc/profile/change', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
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

export const createBooking = async (params?: CreateBookingRequest): Promise<ResponseBase2> => {
  let formData:any = new FormData();
  if(params?.createBookingForm.avatarColor) formData.append('avatarColor', params?.createBookingForm.avatarColor);
  if(params?.mailRequest.candidate?.content) formData.append('contentCandidate', params?.mailRequest.candidate?.content);
  if(params?.mailRequest.presenters?.content) formData.append('contentPresenter',  params?.mailRequest.presenters?.content);
  if(params?.mailRequest.recruitmentCouncils?.content) formData.append('contentRecruitmentCouncil', params?.mailRequest.recruitmentCouncils?.content);
  if(params?.createBookingForm.date) formData.append('date', params?.createBookingForm.date);
  if(params?.mailRequest.candidate?.file) formData.append('fileCandidates',  params?.mailRequest.candidate?.file);
  if(params?.mailRequest.presenters?.file) formData.append('filePresenters', params?.mailRequest.presenters?.file);
  if(params?.mailRequest.recruitmentCouncils?.file) formData.append('fileRecruitmentCouncils', params?.mailRequest.recruitmentCouncils?.file);
  if(params?.createBookingForm.floor) formData.append('floor', params?.createBookingForm.floor);
  if(params?.createBookingForm.idProfile) formData.append('idProfile', params?.createBookingForm.idProfile);
  if( params?.createBookingForm.interviewAddress) formData.append('interviewAddress', params?.createBookingForm.interviewAddress);
  if(params?.createBookingForm.interviewTime) formData.append('interviewTime', params?.createBookingForm.interviewTime);
  if(params?.createBookingForm.interviewers) formData.append('interviewers', params?.createBookingForm.interviewers);
  if(params?.createBookingForm.note) formData.append('note', params?.createBookingForm.note);
  if(params?.createBookingForm.recruitmentId) formData.append('recruitmentId', params?.createBookingForm.recruitmentId);
  if(params?.mailRequest.candidate?.subject) formData.append('subjectCandidate',  params?.mailRequest.candidate?.subject);
  if(params?.mailRequest.presenters?.subject) formData.append('subjectPresenter', params?.mailRequest.presenters?.subject);
  if(params?.mailRequest.recruitmentCouncils?.subject) formData.append('subjectRecruitmentCouncil', params?.mailRequest.recruitmentCouncils?.subject);
  if(params?.createBookingForm.type) formData.append('type', params?.createBookingForm.type);
  return POSTIMAGE('api-svc/calendar/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
};

export const updateBooking = async (params?: UpdateBookingRequest): Promise<ResponseBase2> => {
  let formData:any = new FormData();
  if(params?.updateBookingForm.id) formData.append('id', params?.updateBookingForm.id);
  if(params?.mailRequest.candidate?.content) formData.append('contentCandidate', params?.mailRequest.candidate?.content);
  if(params?.mailRequest.presenters?.content) formData.append('contentPresenter',  params?.mailRequest.presenters?.content);
  if(params?.mailRequest.recruitmentCouncils?.content) formData.append('contentRecruitmentCouncil', params?.mailRequest.recruitmentCouncils?.content);
  if(params?.updateBookingForm.date) formData.append('date', params?.updateBookingForm.date);
  if(params?.mailRequest.candidate?.file) formData.append('fileCandidates',  params?.mailRequest.candidate?.file);
  if(params?.mailRequest.presenters?.file) formData.append('filePresenters', params?.mailRequest.presenters?.file);
  if(params?.mailRequest.recruitmentCouncils?.file) formData.append('fileRecruitmentCouncils', params?.mailRequest.recruitmentCouncils?.file);
  if(params?.updateBookingForm.floor) formData.append('floor', params?.updateBookingForm.floor);
  if( params?.updateBookingForm.interviewAddress) formData.append('interviewAddress', params?.updateBookingForm.interviewAddress);
  if(params?.updateBookingForm.interviewTime) formData.append('interviewTime', params?.updateBookingForm.interviewTime);
  if(params?.updateBookingForm.interviewers) formData.append('interviewers', params?.updateBookingForm.interviewers);
  if(params?.updateBookingForm.note) formData.append('note', params?.updateBookingForm.note);
  if(params?.updateBookingForm.recruitmentId) formData.append('recruitmentId', params?.updateBookingForm.recruitmentId);
  if(params?.mailRequest.candidate?.subject) formData.append('subjectCandidate',  params?.mailRequest.candidate?.subject);
  if(params?.mailRequest.presenters?.subject) formData.append('subjectPresenter', params?.mailRequest.presenters?.subject);
  if(params?.mailRequest.recruitmentCouncils?.subject) formData.append('subjectRecruitmentCouncil', params?.mailRequest.recruitmentCouncils?.subject);
  if(params?.updateBookingForm.type) formData.append('type', params?.updateBookingForm.type);
  return POSTIMAGE('api-svc/calendar/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
};

export const createRejectCandidate = async (params?: CreateRejectCandidateRequest): Promise<ResponseBase2> => {
  let formData:any = new FormData();
  if(params?.createReject.idProfile) formData.append('idProfile',params?.createReject.idProfile);
  if(params?.createReject.reason) formData.append('reason',params?.createReject.reason);
  if(params?.createReject.recruitmentId) formData.append('recruitmentId',params?.createReject.recruitmentId);
  if(params?.mailRequest.candidate?.content) formData.append('contentCandidate',params?.mailRequest.candidate.content);
  if(params?.mailRequest.candidate?.subject) formData.append('subjectCandidate',params?.mailRequest.candidate.subject);
  if(params?.mailRequest.candidate?.file) formData.append('fileCandidates',params?.mailRequest.candidate.file);
  if(params?.mailRequest.presenters?.content) formData.append('contentPresenter',params?.mailRequest.presenters.content);
  if(params?.mailRequest.presenters?.subject) formData.append('subjectPresenter',params?.mailRequest.presenters.subject);
  if(params?.mailRequest.presenters?.file) formData.append('filePresenters',params?.mailRequest.presenters.file);

  return POSTIMAGE('api-svc/profile/reject', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

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

export const addToTalentPool = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/profile/talentpool', params)) as ResponseBase2;
};
