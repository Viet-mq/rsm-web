import {all, takeLatest} from 'redux-saga/effects';

import {
  ADD_ACTION,
  CREATE_VIEW,
  DELETE_VIEW, GET_DETAIL_VIEW,
  GET_LIST_VIEW, REMOVE_ACTION, SEARCH_LIST_VIEW, UPDATE_ACTION,
  UPDATE_VIEW
} from "../actions";
import {createViewAsync} from "./create";
import {updateViewAsync} from "./update";
import {deleteViewAsync} from "./deleteView";
import {getListViewAsync} from "./list";
import {updateActionViewAsync} from "./update_action";
import {addActionViewAsync} from "./add_action";
import {removeActionViewAsync} from "./remove_action";
import {getDetailViewAsync} from "./detail";
import {searchListViewAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(GET_LIST_VIEW, getListViewAsync),
    yield takeLatest(SEARCH_LIST_VIEW, searchListViewAsync),
    yield takeLatest(GET_DETAIL_VIEW, getDetailViewAsync),
    yield takeLatest(CREATE_VIEW, createViewAsync),
    yield takeLatest(UPDATE_VIEW, updateViewAsync),
    yield takeLatest(DELETE_VIEW, deleteViewAsync),
    yield takeLatest(ADD_ACTION, addActionViewAsync),
    yield takeLatest(UPDATE_ACTION, updateActionViewAsync),
    yield takeLatest(REMOVE_ACTION, removeActionViewAsync),
  ]);
}
