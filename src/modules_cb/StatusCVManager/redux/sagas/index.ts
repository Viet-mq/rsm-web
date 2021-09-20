import {all, takeLatest} from 'redux-saga/effects';
import {createStatusCVAsync} from "./create";
import {deleteStatusCVAsync} from "./deleteStatusCV";
import {getListStatusCVAsync} from "./list";
import {updateStatusCVAsync} from "./update";
import { CREATE_STATUSCV, DELETE_STATUSCV, GET_LIST_STATUSCV, UPDATE_STATUSCV} from "../actions";

export default function* root() {
  return all([
    yield takeLatest(CREATE_STATUSCV, createStatusCVAsync),
    yield takeLatest(DELETE_STATUSCV, deleteStatusCVAsync),
    yield takeLatest(GET_LIST_STATUSCV, getListStatusCVAsync),
    yield takeLatest(UPDATE_STATUSCV, updateStatusCVAsync),
  ]);
}
