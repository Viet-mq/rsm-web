export interface ProfileEntity {
  id: string,
  cv: string,
  cvType: string,
  dateOfApply: number,
  dateOfBirth: number,
  email: string,
  fullName: string,
  hometown: string,
  hrRef: string,
  job: string,
  levelJob: string,
  phoneNumber: string,
  school: string,
  sourceCV: string,
}

export interface CreateProfileRequest {
  cv: string,
  cvType: string,
  dateOfApply: number,
  dateOfBirth: number,
  email: string,
  fullName: string,
  hometown: string,
  hrRef: string,
  job: string,
  levelJob: string,
  phoneNumber: string,
  school: string,
  sourceCV: string,
}

export interface UpdateProfileRequest {
  id: string,
  cv: string,
  cvType: string,
  dateOfApply: number,
  dateOfBirth: number,
  email: string,
  fullName: string,
  hometown: string,
  hrRef: string,
  job: string,
  levelJob: string,
  phoneNumber: string,
  school: string,
  sourceCV: string,
}

export interface DeleteProfileRequest {
  id: string,
}

export interface UploadCVRequest {
  profileId: string,
  file: any,
}

export interface DetailCV {
  show_detail: boolean,
  general: number,
  detail: number,
}

export interface BookingEntity {
  id: string,
  idProfile: string,
  time: number,
  address: string,
  form: string,
  interviewer: string[],
  interviewee: string,
  content: string,
  question: string[],
  comments: string[],
  evaluation: string,
  status: string,
  reason: string,
  timeStart: number,
  timeFinish: number
}

export interface DetailProfileRequest {
  id: string,
  fullName: string,
  gender: string,
  phoneNumber: string,
  email: string,
  dateOfBirth: number,
  hometown: string,
  school: string,
  job: string,
  levelJob: string,
  cv: string,
  sourceCV: string,
  hrRef: string,
  dateOfApply: number,
  cvType: string,
  lastApply: number,
  tags: string,
  dateOfCreate: number,
  dateOfUpdate: number,
  note: string,
  evaluation: string,
  statusCV: string
}

export interface CreateBookingRequest {
  idProfile: string,
  time: number,
  address: string,
  form: string,
  interviewer: string[],
  interviewee: string,
  content: string,
  question: string[],
  comments: string[],
  evaluation: string,
  status: string,
  reason: string,
  timeStart: number,
  timeFinish: number
}

export interface UpdateBookingRequest {
  id: string,
  idProfile: string,
  time: number,
  address: string,
  form: string,
  interviewer: string[],
  interviewee: string,
  content: string,
  question: string[],
  comments: string[],
  evaluation: string,
  status: string,
  reason: string,
  timeStart: number,
  timeFinish: number
}

export interface ActivityLogsEntity {
  id: string,
  idProfile: string,
  time: number,
  action: string,
  by: string,
}
