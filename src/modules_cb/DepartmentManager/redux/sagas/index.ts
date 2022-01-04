import {all, takeLatest} from 'redux-saga/effects';
import {createDepartmentAsync} from "./create";
import {deleteDepartmentAsync} from "./deleteDepartment";
import {getListDepartmentAsync} from "./list";
import {updateDepartmentAsync} from "./update";
import { CREATE_DEPARTMENT, DELETE_DEPARTMENT, GET_LIST_DEPARTMENT, UPDATE_DEPARTMENT} from "../actions";

export default function* root() {
  return all([
    yield takeLatest(CREATE_DEPARTMENT, createDepartmentAsync),
    yield takeLatest(DELETE_DEPARTMENT, deleteDepartmentAsync),
    yield takeLatest(GET_LIST_DEPARTMENT, getListDepartmentAsync),
    yield takeLatest(UPDATE_DEPARTMENT, updateDepartmentAsync),
  ]);
}
