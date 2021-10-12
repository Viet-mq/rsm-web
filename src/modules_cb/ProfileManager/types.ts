export interface ProfileEntity {
  id: string,
  fullName: string,
  phoneNumber: string,
  email: string,
  dateOfBirth: number,
  hometown: string,
  schoolId: string,
  schoolName: string,
  jobId: string,
  jobName: string,
  levelJobId: string,
  levelJobName: string,
  cv: string,
  sourceCVId: string,
  sourceCVName: string,
  hrRef: string,
  dateOfApply: number,
  cvType: string,
  statusCVId: string,
  statusCVName: string,
}

export interface CreateProfileRequest {
  fullName: string,
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
  // statusCV: string,
}

export interface UpdateProfileRequest {
  id: string,
  fullName: string,
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
  // statusCV: string,
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
  statusId: string,
  statusName: string,
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
  schoolId: string,
  schoolName: string,
  jobId: string,
  jobName: string,
  levelJobId: string,
  levelJobName: string,
  cv: string,
  sourceCVId: string,
  sourceCVName: string,
  hrRef: string,
  dateOfApply: number,
  cvType: string,
  lastApply: number,
  tags: string,
  dateOfCreate: number,
  dateOfUpdate: number,
  note: string,
  evaluation: string,
  statusCVId: string,
  statusCVName: string,
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
  type: string,
  username: string,
  fullName: string
}
