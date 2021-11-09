//profile
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
  cv: string,
  urlCV: string,
  departmentId: string,
  departmentName: string
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
  talentPool: string,
  department: string,

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
  department: string,

}

export interface DeleteProfileRequest {
  id: string,
}

export interface UploadAvatarRequest {
  profileId: string | any,
  image: any,
}

export interface SearchRequest {
  key: string ,
  size: number,
}



//cv
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

//booking
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

//detail
export interface UpdateDetailRequest {
  id: string,
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
  phoneNumber: string,
  school: string,
  sourceCV: string,
  talentPool: string

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
  urlCV: string,
  sourceCVId: string,
  sourceCVName: string,
  hrRef: string,
  dateOfApply: number,
  lastApply: number,
  dateOfCreate: number,
  dateOfUpdate: number,
  evaluation: string,
  statusCVId: string,
  statusCVName: string,
  image: string,
  talentPoolId: string
  talentPoolName: string
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

//note
export interface NoteEntity {
  id: string | any,
  idProfile: string,
  username: string,
  fullName: string,
  comment: string,
  evaluation: string,
  fileName?: any,
  url: string,
  updateAt:number,
  updateBy:string
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
