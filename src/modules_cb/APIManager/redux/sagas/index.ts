import {all, takeLatest} from 'redux-saga/effects';
import {CREATE_API, DELETE_API, GET_LIST_API, UPDATE_API} from "../actions";
import {createApiAsync} from "./create";
import {getListApiAsync} from "./list";
import {updateApiAsync} from "./update";
import {deleteApiAsync} from "./deleteApi";

export default function* root() {
  return all([
    yield takeLatest(CREATE_API, createApiAsync),
    yield takeLatest(GET_LIST_API, getListApiAsync),
    yield takeLatest(UPDATE_API, updateApiAsync),
    yield takeLatest(DELETE_API, deleteApiAsync),
  ]);
}
