import {all, takeLatest} from 'redux-saga/effects';
import {createBlacklistAsync} from "./create";
import {deleteBlacklistAsync} from "./deleteBlacklist";
import {getListBlacklistAsync} from "./list";
import {updateBlacklistAsync} from "./update";
import { CREATE_BLACKLIST, DELETE_BLACKLIST, GET_LIST_BLACKLIST, UPDATE_BLACKLIST} from "../actions";

export default function* root() {
  return all([
    yield takeLatest(CREATE_BLACKLIST, createBlacklistAsync),
    yield takeLatest(DELETE_BLACKLIST, deleteBlacklistAsync),
    yield takeLatest(GET_LIST_BLACKLIST, getListBlacklistAsync),
    yield takeLatest(UPDATE_BLACKLIST, updateBlacklistAsync),
  ]);
}
