export interface ProfileEntity {
  id: string,
  dateOfApply: number,
  dateOfBirth: number,
  email: string,
  fullName: string,
  gender: string,
  hometown: string,
  hrRef: string,
  image: string,
  jobId: string,
  jobName: string,
  levelJobId: string,
  levelJobName: string,
  phoneNumber: string,
  schoolId: string,
  schoolName: string,
  sourceCVId: string,
  sourceCVName: string,
  statusCVId: string,
  statusCVName: string,
  talentPoolId: string,
  talentPoolName: string,
}

export interface CreateProfileRequest {
  dateOfApply: number,
  dateOfBirth: number,
  email: string,
  fullName: string,
  gender: string,
  hometown: string,
  hrRef: string,
  job: string,
  levelJob: string,
  phoneNumber: string,
  school: string,
  sourceCV: string,
  talentPool: string
}

export interface UpdateProfileRequest {
  dateOfApply: number,
  dateOfBirth: number,
  email: string,
  fullName: string,
  gender: string,
  hometown: string,
  hrRef: string,
  id: string,
  job: string,
  levelJob: string,
  phoneNumber: string,
  school: string,
  sourceCV: string,
  talentPool: string

}

export interface DeleteProfileRequest {
  id: string,
}

export interface UploadCVRequest {
  profileId: string | any,
  file: any,
}

export interface UploadListCVRequest {
  file: any,
}

export interface DetailCV {
  show_detail: boolean,
  general: number,
  detail: number,
}

export interface BookingEntity {
  id: string | any,
  idProfile: string | any,
  time: number,
  address: string,
  form: string,
  interviewer: string[],
  interviewee: string,
  content: string,
  question: string,
  comments: string,
  evaluation: string,
  statusId: string,
  statusName: string,
  reason: string,
  timeStart: number,
  timeFinish: number
}

export interface UpdateDetailRequest {
  id: string,
  cv: string,
  cvType: string,
  dateOfApply: number,
  dateOfBirth: number,
  email: string,
  evaluation: string,
  fullName: string,
  gender: string,
  hometown: string,
  hrRef: string,
  job: string,
  lastApply: number,
  levelJob: string,
  note: string,
  phoneNumber: string,
  school: string,
  sourceCV: string,
  tags: string
}

export interface DetailProfileEntity {
  id: string | any,
  fullName: string | any,
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
  idProfile: string | any,
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

export interface DataShowBooking {
  id: string,
  fullName: string
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

export interface NoteEntity {
  id: string | any,
  idProfile: string,
  username: string,
  fullName: string,
  comment: string,
  evaluation: string,
  fileName?: any,
  path: string
}

export interface UpdateNoteRequest {
  id: string,
  username: string,
  comment: string,
  evaluation: string,
  file?: any,
}

export interface CreateNoteRequest {
  idProfile: string,
  username: string,
  comment: string,
  evaluation: string,
  file?: any,
}

export interface DeleteNoteRequest {
  id: string,
}
