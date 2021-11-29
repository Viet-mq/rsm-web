

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

  // time: number,
  // address: string,
  // form: string,
  // interviewer: string[],
  // interviewee: string,
  // content: string,
  // question: string,
  // comments: string,
  // evaluation: string,
  // statusId: string,
  // statusName: string,
  // reason: string,
  // timeStart: number,
  // timeFinish: number


}

export interface CreateScheduleRequest {
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


  // idProfile: string | any,
  // time: number,
  // avatarColor:string,
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


