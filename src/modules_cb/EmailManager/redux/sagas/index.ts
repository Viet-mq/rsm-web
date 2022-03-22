import {all, takeLatest} from 'redux-saga/effects';
import {createEmailAsync} from "./create";
import {getListEmailAsync} from "./list";
import {updateEmailAsync} from "./update";
import {CREATE_EMAIL, GET_KEY_POINT, GET_LIST_EMAIL, SEARCH_LIST_EMAIL, UPDATE_EMAIL} from "../actions";
import {getKeyPointAsync} from "./keyPoint";
import {searchListEmailAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(CREATE_EMAIL, createEmailAsync),
    yield takeLatest(GET_LIST_EMAIL, getListEmailAsync),
    yield takeLatest(SEARCH_LIST_EMAIL, searchListEmailAsync),
    yield takeLatest(UPDATE_EMAIL, updateEmailAsync),
    yield takeLatest(GET_KEY_POINT, getKeyPointAsync),
  ]);
}
