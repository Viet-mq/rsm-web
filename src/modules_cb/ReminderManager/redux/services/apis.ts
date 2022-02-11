import {ResponseBase2} from "src/models/common";
import {GET, POST, POSTIMAGE} from "src/services";
import {CreateScheduleRequest} from "../../types";

export const createSchedule = async (params?: CreateScheduleRequest): Promise<ResponseBase2> => {
  let formData: any = new FormData();
  if (params?.mailRequest.candidate?.content) formData.append('contentCandidate', params?.mailRequest.candidate?.content);
  if (params?.mailRequest.presenters?.content) formData.append('contentPresenter', params?.mailRequest.presenters?.content);
  if (params?.mailRequest.recruitmentCouncils?.content) formData.append('contentRecruitmentCouncil', params?.mailRequest.recruitmentCouncils?.content);
  if (params?.mailRequest.candidate?.file) {
    for(let i=0;i<params?.mailRequest.candidate?.file.length;i++){
      formData.append('fileCandidates', params?.mailRequest.candidate?.file[i]);
    }
  }
  if (params?.mailRequest.presenters?.file) formData.append('filePresenters', params?.mailRequest.presenters?.file);
  if (params?.mailRequest.recruitmentCouncils?.file) formData.append('fileRecruitmentCouncils', params?.mailRequest.recruitmentCouncils?.file);
  if (params?.createScheduleForm.floor) formData.append('floor', params?.createScheduleForm.floor);
  if (params?.createScheduleForm.interviewAddress) formData.append('interviewAddress', params?.createScheduleForm.interviewAddress);
  if (params?.createScheduleForm.interviewers) formData.append('interviewers', params?.createScheduleForm.interviewers);
  if (params?.createScheduleForm.note) formData.append('note', params?.createScheduleForm.note);
  if (params?.createScheduleForm.recruitmentId) formData.append('recruitmentId', params?.createScheduleForm.recruitmentId);
  if (params?.mailRequest.candidate?.subject) formData.append('subjectCandidate', params?.mailRequest.candidate?.subject);
  if (params?.mailRequest.presenters?.subject) formData.append('subjectPresenter', params?.mailRequest.presenters?.subject);
  if (params?.mailRequest.recruitmentCouncils?.subject) formData.append('subjectRecruitmentCouncil', params?.mailRequest.recruitmentCouncils?.subject);
  if (params?.createScheduleForm.type) formData.append('type', params?.createScheduleForm.type);
  if (params?.createScheduleForm.times) formData.append('times', JSON.stringify(params?.createScheduleForm.times));
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
