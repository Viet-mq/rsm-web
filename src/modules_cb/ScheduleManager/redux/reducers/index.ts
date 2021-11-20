import {combineReducers} from "redux";
import showSchedule, {ScheduleState} from "./schedule/showSchedule";
import getSchedule, {GetScheduleState} from "./schedule/getAllSchedule";
import createSchedule, {CreateScheduleState} from "./schedule/createSchedule";
import updateSchedule, {UpdateScheduleState} from "./schedule/updateSchedule";

export interface ScheduleManagerModuleState {
  showSchedule: ScheduleState,
  getSchedule: GetScheduleState,
  createSchedule: CreateScheduleState,
  updateSchedule: UpdateScheduleState,

}

export default combineReducers<ScheduleManagerModuleState>({
  showSchedule,
  updateSchedule,
  getSchedule,
  createSchedule,

});
