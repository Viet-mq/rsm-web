//schedule
export interface ScheduleEntity {
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

export interface CreateScheduleRequest {
  floor: string,
  interviewAddress: string,
  interviewers: string[],
  note: string,
  recruitmentId: string,
  times: ScheduleTime[],
  type: string
}

export interface ScheduleTime{
  avatarColor: string,
  date: number,
  idProfile: string,
  fullName:string,
  interviewTime: number
}

export interface UpdateScheduleRequest {
  date: number,
  floor: string,
  id: string,
  interviewAddress: string,
  interviewTime: number,
  interviewers: string[],
  note: string,
  recruitmentId: string,
  type: string

  // id: string,
  // idProfile: string,
  // time: number,
  // address: string,
  // form: string,
  // interviewer: string[],
  // interviewee: string,
  // content: string,
  // question: string[],
  // comments: string[],
  // evaluation: string,
  // status: string,
  // reason: string,
  // timeStart: number,
  // timeFinish: number
}

export interface DataShowSchedule {
  id: string,
  fullName: string
}

export interface DeleteScheduleRequest {
  id: string,
}


