import {all, takeLatest} from 'redux-saga/effects';
import {createJobAsync} from "./create";
import {deleteJobAsync} from "./deleteJob";
import {getListRecruitmentAsync} from "./list";
import {updateJobAsync} from "./update";
import { CREATE_JOB, DELETE_JOB, GET_LIST_RECRUITMENT, UPDATE_JOB} from "../actions";

export default function* root() {
  return all([
    yield takeLatest(CREATE_JOB, createJobAsync),
    yield takeLatest(DELETE_JOB, deleteJobAsync),
    yield takeLatest(GET_LIST_RECRUITMENT, getListRecruitmentAsync),
    yield takeLatest(UPDATE_JOB, updateJobAsync),
  ]);
}
