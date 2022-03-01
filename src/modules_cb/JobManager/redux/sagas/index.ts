import {all, takeLatest} from 'redux-saga/effects';
import {createJobAsync} from "./create";
import {deleteJobAsync} from "./deleteJob";
import {getListJobAsync} from "./list";
import {updateJobAsync} from "./update";
import {CREATE_JOB, DELETE_JOB, GET_LIST_JOB, GET_SEARCH_JOB, UPDATE_JOB} from "../actions";
import {getSearchJobAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(CREATE_JOB, createJobAsync),
    yield takeLatest(DELETE_JOB, deleteJobAsync),
    yield takeLatest(GET_LIST_JOB, getListJobAsync),
    yield takeLatest(GET_SEARCH_JOB, getSearchJobAsync),
    yield takeLatest(UPDATE_JOB, updateJobAsync),
  ]);
}
