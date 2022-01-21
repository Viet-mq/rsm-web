import {all, takeLatest} from 'redux-saga/effects';
import {createEmailAsync} from "./create";
import {deleteJobAsync} from "./deleteJob";
import {getListEmailAsync} from "./list";
import {updateEmailAsync} from "./update";
import {CREATE_EMAIL, DELETE_JOB, GET_LIST_EMAIL, UPDATE_EMAIL} from "../actions";

export default function* root() {
  return all([
    yield takeLatest(CREATE_EMAIL, createEmailAsync),
    yield takeLatest(DELETE_JOB, deleteJobAsync),
    yield takeLatest(GET_LIST_EMAIL, getListEmailAsync),
    yield takeLatest(UPDATE_EMAIL, updateEmailAsync),
  ]);
}
