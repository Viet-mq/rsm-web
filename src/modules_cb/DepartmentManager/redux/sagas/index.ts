import {all, takeLatest} from 'redux-saga/effects';
import {createDepartmentAsync} from "./create";
import {deleteDepartmentAsync} from "./deleteDepartment";
import {getListDepartmentAsync} from "./list";
import {updateDepartmentAsync} from "./update";
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  GET_LIST_DEPARTMENT,
  SEARCH_LIST_DEPARTMENT,
  UPDATE_DEPARTMENT
} from "../actions";
import {searchListDepartmentAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(CREATE_DEPARTMENT, createDepartmentAsync),
    yield takeLatest(DELETE_DEPARTMENT, deleteDepartmentAsync),
    yield takeLatest(GET_LIST_DEPARTMENT, getListDepartmentAsync),
    yield takeLatest(SEARCH_LIST_DEPARTMENT, searchListDepartmentAsync),
    yield takeLatest(UPDATE_DEPARTMENT, updateDepartmentAsync),
  ]);
}
