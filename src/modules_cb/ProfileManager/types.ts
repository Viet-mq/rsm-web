//profile
export interface ProfileEntity {
  id: string,
  avatarColor: string,
  dateOfApply: number,
  dateOfBirth: number,
  email: string,
  fullName: string | any,
  gender: string,
  hometown: string,
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
  departmentName: string,
  levelSchool: string
  hrRef: string,
  username: string,
  mailRef: string
  recruitmentId: string
  recruitmentName: string
  skill: string[]
}

export interface CreateProfileRequest {
  dateOfBirth: number,
  email: string,
  avatarColor: string,
  fullName: string,
  gender: string,
  hometown: string,
  hrRef: string,
  job: string,
  levelJob: string,
  phoneNumber: string,
  school: string,
  sourceCV: string,
  levelSchool: string,
  mailRef: string,
  skill: string[],
  talentPool: string,
  department: string,
  dateOfApply: number,

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
  levelSchool: string,
  mailRef: string,
  recruitment: string,
  skill: string[]
}

export interface DeleteProfileRequest {
  id: string,
}

export interface CreateRejectForm {
  idProfile?: string,
  reason: string,
  recruitmentId?: string,
}

export interface CreateRejectCandidateRequest {
  createReject: CreateRejectForm,
  mailRequest: MailRequest,
}

export interface UploadAvatarRequest {
  profileId: string | any,
  image: any,
}

export interface SearchRequest {
  key: string,
  size?: number,
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

//schedule
export interface BookingEntity {
  id: string | any,
  avatarColor: string,
  idProfile: string | any,
  floor: string,
  interviewTime: number,
  interviewers: string[],
  note: string,
  recruitmentId: string,
  type: string
  recruitmentName: string,
  interviewAddressId: string,
  interviewAddressName: string,
  fullName: string,
  date: number,

}

export interface MailForm {
  subject: string,
  content: string,
  file?: any,
}

export interface MailRequest {
  candidate?: MailForm,
  presenters?: MailForm,
  recruitmentCouncils?: MailForm
}

export interface CreateBookingForm {
  avatarColor: string,
  idProfile: string | any,
  floor: string,
  interviewAddress: string,
  interviewTime: number,
  interviewers: string[],
  note: string,
  recruitmentId: string,
  type: string,
  date: number,
}

export interface CreateBookingRequest {
  createBookingForm: CreateBookingForm,
  mailRequest: MailRequest,
}

export interface UpdateBookingRequest {
  updateBookingForm: UpdateBookingForm,
  mailRequest: MailRequest,
}

export interface UpdateBookingForm {
  date: number,
  floor: string,
  id: string,
  interviewAddress: string,
  interviewTime: number,
  interviewers: string[],
  note: string,
  recruitmentId: string,
  type: string,

}

export interface DataShowBooking {
  id: string,
  fullName: string,
  idRecruitment: string,
  username: string,
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
  avatarColor: string,
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
  dateOfApply: number,
  lastApply: number,
  dateOfCreate: number,
  dateOfUpdate: number,
  evaluation: string,
  statusCVId: string,
  statusCVName: string,
  image: string,
  talentPoolId: string
  talentPoolName: string,
  departmentId: string
  departmentName: string
  levelSchool: string
  hrRef: string,
  username: string,
  mailRef: string
  recruitmentId: string
  recruitmentName: string
  skill: string[]

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
  updateAt: string,
  updateBy: string
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


export interface ProcessForm {
  idProfile?: string,
  recruitmentId?: string,
  statusCVId?: string,
  username?:string,
}

export interface ChangeProcessRequest {
  changeProcess: ProcessForm,
  mailRequest?: MailRequest,
}

export interface AddToTalentPoolRequest {
  profileId?: string,
  talentPoolId: string

}


