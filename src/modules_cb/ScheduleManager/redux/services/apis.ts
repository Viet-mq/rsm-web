import {ResponseBase2} from "src/models/common";
import {GET, POST, POSTIMAGE} from "src/services";
import {CreateScheduleRequest} from "../../types";

export const createSchedule = async (params?: CreateScheduleRequest): Promise<ResponseBase2> => {
  let formData: any = new FormData();
  if (params?.createScheduleForm.floor) formData.append('floor', params?.createScheduleForm.floor);
  if (params?.createScheduleForm.interviewAddress) formData.append('interviewAddress', params?.createScheduleForm.interviewAddress);
  if (params?.createScheduleForm.interviewers) formData.append('interviewers', params?.createScheduleForm.interviewers);
  if (params?.createScheduleForm.note) formData.append('note', params?.createScheduleForm.note);
  if (params?.createScheduleForm.recruitmentId) formData.append('recruitmentId', params?.createScheduleForm.recruitmentId);
  if (params?.createScheduleForm.type) formData.append('type', params?.createScheduleForm.type);
  if (params?.createScheduleForm.times) formData.append('times', JSON.stringify(params?.createScheduleForm.times));

  //-------------Content----------
  if (params?.mailRequest?.candidate?.content) formData.append('contentCandidate', params?.mailRequest.candidate?.content);
  if (params?.mailRequest?.presenters?.content) formData.append('contentPresenter', params?.mailRequest.presenters?.content);
  if (params?.mailRequest?.interviewers?.content) formData.append('contentRecruitmentCouncil', params?.mailRequest.interviewers?.content);
  if (params?.mailRequest?.members?.content) formData.append('contentRelatedPeople', params?.mailRequest.members?.content);
  //-------------File--------------
  if (params?.mailRequest?.candidate?.file) {
    for (let i = 0; i < params?.mailRequest.candidate?.file.length; i++) {
      formData.append('fileCandidates', params?.mailRequest.candidate?.file[i]);
    }
  }
  if (params?.mailRequest?.presenters?.file) {
    for (let i = 0; i < params?.mailRequest.presenters?.file.length; i++) {
      formData.append('filePresenters', params?.mailRequest.presenters?.file[i]);
    }
  }
  if (params?.mailRequest?.interviewers?.file) {
    for (let i = 0; i < params?.mailRequest.interviewers?.file.length; i++) {
      formData.append('fileRecruitmentCouncils', params?.mailRequest.interviewers?.file[i]);
    }
  }
  if (params?.mailRequest?.members?.file) {
    for (let i = 0; i < params?.mailRequest.members?.file.length; i++) {
      formData.append('fileRelatedPeoples', params?.mailRequest.members?.file[i]);
    }
  }
  //--------------Subject---------
  if (params?.mailRequest?.candidate?.subject) formData.append('subjectCandidate', params?.mailRequest.candidate?.subject);
  if (params?.mailRequest?.presenters?.subject) formData.append('subjectPresenter', params?.mailRequest.presenters?.subject);
  if (params?.mailRequest?.interviewers?.subject) formData.append('subjectRecruitmentCouncil', params?.mailRequest.interviewers?.subject);
  if (params?.mailRequest?.members?.subject) formData.append('subjectRelatedPeople', params?.mailRequest.members?.subject);
  //------------Username system-------
  if (params?.mailRequest?.presenters?.username) formData.append('usernamePresenters', params?.mailRequest.presenters?.username);
  if (params?.mailRequest?.interviewers?.username) formData.append('usernameRecruitmentCouncils', params?.mailRequest.interviewers?.username);
  if (params?.mailRequest?.members?.username) formData.append('usernameRelatedPeoples', params?.mailRequest.members?.username);
  //----------Email outside system-----
  if (params?.mailRequest?.presenters?.email) formData.append('emailPresenter', params?.mailRequest.presenters?.email);
  if (params?.mailRequest?.interviewers?.email) formData.append('emailRecruitmentCouncil', params?.mailRequest.interviewers?.email);
  //----------------------------------

  return POSTIMAGE('api-svc/calendars/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
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
