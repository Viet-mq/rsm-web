import {all, takeLatest} from 'redux-saga/effects';
import {createJobLevelAsync} from "./create";
import {deleteJobLevelAsync} from "./deleteJobLevel";
import {getListJobLevelAsync} from "./list";
import {updateJobLevelAsync} from "./update";
import { CREATE_JOBLEVEL, DELETE_JOBLEVEL, GET_LIST_JOBLEVEL, UPDATE_JOBLEVEL} from "../actions";

export default function* root() {
  return all([
    yield takeLatest(CREATE_JOBLEVEL, createJobLevelAsync),
    yield takeLatest(DELETE_JOBLEVEL, deleteJobLevelAsync),
    yield takeLatest(GET_LIST_JOBLEVEL, getListJobLevelAsync),
    yield takeLatest(UPDATE_JOBLEVEL, updateJobLevelAsync),
  ]);
}
