import {combineReducers} from "redux";
import showSchedule, {ScheduleState} from "./schedule/showSchedule";
import getSchedule, {GetScheduleState} from "./schedule/getAllSchedule";
import createSchedule, {CreateScheduleState} from "./schedule/createSchedule";
import updateSchedule, {UpdateScheduleState} from "./schedule/updateSchedule";
import deleteSchedule, {DeleteScheduleState} from "./schedule/deleteSchedule";
import getCandidates, {GetCandidatesState} from "./schedule/getCandidates";

export interface ScheduleManagerModuleState {
  showSchedule: ScheduleState,
  getSchedule: GetScheduleState,
  createSchedule: CreateScheduleState,
  updateSchedule: UpdateScheduleState,
  deleteSchedule:DeleteScheduleState,
  getCandidates:GetCandidatesState,
}

export default combineReducers<ScheduleManagerModuleState>({
  showSchedule,
  updateSchedule,
  getSchedule,
  createSchedule,
  deleteSchedule,
  getCandidates,
});
