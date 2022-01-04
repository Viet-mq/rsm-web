import {all, takeLatest} from 'redux-saga/effects';
import {createSchoolAsync} from "./create";
import {deleteSchoolAsync} from "./deleteSchool";
import {getListSchoolAsync} from "./list";
import {updateSchoolAsync} from "./update";
import { CREATE_SCHOOL, DELETE_SCHOOL, GET_LIST_SCHOOL, UPDATE_SCHOOL} from "../actions";

export default function* root() {
  return all([
    yield takeLatest(CREATE_SCHOOL, createSchoolAsync),
    yield takeLatest(DELETE_SCHOOL, deleteSchoolAsync),
    yield takeLatest(GET_LIST_SCHOOL, getListSchoolAsync),
    yield takeLatest(UPDATE_SCHOOL, updateSchoolAsync),
  ]);
}
