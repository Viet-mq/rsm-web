import {all, takeLatest} from 'redux-saga/effects';
import {createSourceCVAsync} from "./create";
import {deleteSourceCVAsync} from "./deleteSourceCV";
import {getListSourceCVAsync} from "./list";
import {updateSourceCVAsync} from "./update";
import {
  CREATE_SOURCE_CV,
  DELETE_SOURCE_CV,
  GET_LIST_SOURCE_CV,
  GET_SEARCH_SOURCE_CV,
  UPDATE_SOURCE_CV
} from "../actions";
import {getSearchSourceCVAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(CREATE_SOURCE_CV, createSourceCVAsync),
    yield takeLatest(DELETE_SOURCE_CV, deleteSourceCVAsync),
    yield takeLatest(GET_LIST_SOURCE_CV, getListSourceCVAsync),
    yield takeLatest(UPDATE_SOURCE_CV, updateSourceCVAsync),
    yield takeLatest(GET_SEARCH_SOURCE_CV, getSearchSourceCVAsync),
  ]);
}
