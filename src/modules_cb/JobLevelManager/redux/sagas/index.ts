import {all, takeLatest} from 'redux-saga/effects';
import {createJobLevelAsync} from "./create";
import {deleteJobLevelAsync} from "./deleteJobLevel";
import {getListJobLevelAsync} from "./list";
import {updateJobLevelAsync} from "./update";
import {CREATE_JOB_LEVEL, DELETE_JOB_LEVEL, GET_LIST_JOB_LEVEL, GET_SEARCH_JOB_LEVEL, UPDATE_JOB_LEVEL} from "../actions";
import {getSearchJobLevelAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(CREATE_JOB_LEVEL, createJobLevelAsync),
    yield takeLatest(DELETE_JOB_LEVEL, deleteJobLevelAsync),
    yield takeLatest(GET_LIST_JOB_LEVEL, getListJobLevelAsync),
    yield takeLatest(GET_SEARCH_JOB_LEVEL, getSearchJobLevelAsync),
    yield takeLatest(UPDATE_JOB_LEVEL, updateJobLevelAsync),
  ]);
}
