import {all, takeLatest} from 'redux-saga/effects';
import {createSourceCVAsync} from "./create";
import {deleteSourceCVAsync} from "./deleteSourceCV";
import {getListSourceCVAsync} from "./list";
import {updateSourceCVAsync} from "./update";
import { CREATE_SOURCECV, DELETE_SOURCECV, GET_LIST_SOURCECV, UPDATE_SOURCECV} from "../actions";

export default function* root() {
  return all([
    yield takeLatest(CREATE_SOURCECV, createSourceCVAsync),
    yield takeLatest(DELETE_SOURCECV, deleteSourceCVAsync),
    yield takeLatest(GET_LIST_SOURCECV, getListSourceCVAsync),
    yield takeLatest(UPDATE_SOURCECV, updateSourceCVAsync),
  ]);
}
