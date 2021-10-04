export interface ProfileEntity {
  id: string,
  cv: string,
  cvType: string,
  dateOfApply: string,
  dateOfBirth: string,
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
  dateOfApply: string,
  dateOfBirth: string,
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
  dateOfApply: string,
  dateOfBirth: string,
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
  time: string,
  address: string,
  form: string,
  interviewer: string[],
  interviewee: string,
  content: string,
  question: string[],
  comment: string[],
  evaluation: string,
  status: string,
  reason: string,
  timeStart: string,
  timeFinish: string
}

export interface DetailProfileRequest {
  id: string,
  fullName: string,
  gender: string,
  phoneNumber: string,
  email: string,
  dateOfBirth: string,
  hometown: string,
  school: string,
  job: string,
  levelJob: string,
  cv: string,
  sourceCV: string,
  hrRef: string,
  dateOfApply: string,
  cvType: string,
  lastApply: string,
  tags: string,
  dateOfCreate: string,
  dateOfUpdate: string,
  note: string,
  evaluation: string,
  statusCV: string
}

export interface CreateBookingRequest {
  idProfile: string,
  time: string,
  address: string,
  form: string,
  interviewer: string[],
  interviewee: string,
  content: string,
  question: string[],
  comment: string[],
  evaluation: string,
  status: string,
  reason: string,
  timeStart: string,
  timeFinish: string
}

export interface UpdateBookingRequest {
  id: string,
  idProfile: string,
  time: string,
  address: string,
  form: string,
  interviewer: string[],
  interviewee: string,
  content: string,
  question: string[],
  comment: string[],
  evaluation: string,
  status: string,
  reason: string,
  timeStart: string,
  timeFinish: string
}
