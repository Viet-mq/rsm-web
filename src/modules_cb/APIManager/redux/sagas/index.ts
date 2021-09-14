import {all, takeLatest} from 'redux-saga/effects';
import {CREATE_API, DELETE_API, GET_LIST_API_ROLE, UPDATE_API} from "../actions";
import {createApiAsync} from "./create";
import {getListApiRoleAsync} from "./list";
import {updateApiAsync} from "./update";
import {deleteApiAsync} from "./deleteApi";

export default function* root() {
  return all([
    yield takeLatest(CREATE_API, createApiAsync),
    yield takeLatest(GET_LIST_API_ROLE, getListApiRoleAsync),
    yield takeLatest(UPDATE_API, updateApiAsync),
    yield takeLatest(DELETE_API, deleteApiAsync),
  ]);
}
