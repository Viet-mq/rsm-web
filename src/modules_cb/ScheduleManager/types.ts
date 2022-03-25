
//schedule
import {CreateBookingForm, MailRequest} from "../ProfileManager/types";

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
  createAt: number,
  createBy: string

}

export interface CreateScheduleRequest {
  createScheduleForm: CreateScheduleForm,
  mailRequest?: MailRequest,
}

export interface CreateScheduleForm {
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

}

export interface DataShowSchedule {
  id: string,
  fullName: string
}

export interface DeleteScheduleRequest {
  id: string,
}


