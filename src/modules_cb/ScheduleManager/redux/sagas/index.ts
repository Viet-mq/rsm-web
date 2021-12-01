import {all, takeLatest} from 'redux-saga/effects';
import {CREATE_LIST_SCHEDULE, DELETE_SCHEDULE, GET_CANDIDATES, GET_SCHEDULE, UPDATE_SCHEDULE,} from "../actions";
import {getAllScheduleAsync} from "./schedule/getAllSchedule";
import {updateScheduleAsync} from "./schedule/updateSchedule";
import {createScheduleAsync} from "./schedule/createSchedule";
import {deleteScheduleAsync} from "./schedule/deleteSchedule";
import {getCandidatesAsync} from "./schedule/getCandidates";

export default function* root() {
  return all([
    yield takeLatest(GET_SCHEDULE, getAllScheduleAsync),
    yield takeLatest(CREATE_LIST_SCHEDULE, createScheduleAsync),
    yield takeLatest(UPDATE_SCHEDULE, updateScheduleAsync),
    yield takeLatest(DELETE_SCHEDULE, deleteScheduleAsync),
    yield takeLatest(GET_CANDIDATES, getCandidatesAsync),

  ]);
}
