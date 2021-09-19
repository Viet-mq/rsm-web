import {all, takeLatest} from 'redux-saga/effects';
import {createJobAsync} from "./create";
import {deleteJobAsync} from "./deleteDepartment";
import {getListJobAsync} from "./list";
import {updateJobAsync} from "./update";
import { CREATE_JOB, DELETE_JOB, GET_LIST_JOB, UPDATE_JOB} from "../actions";

export default function* root() {
  return all([
    yield takeLatest(CREATE_JOB, createJobAsync),
    yield takeLatest(DELETE_JOB, deleteJobAsync),
    yield takeLatest(GET_LIST_JOB, getListJobAsync),
    yield takeLatest(UPDATE_JOB, updateJobAsync),
  ]);
}
