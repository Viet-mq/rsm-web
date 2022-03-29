import {all, takeLatest} from 'redux-saga/effects';
import {createViewRolesAsync} from "./create";
import {deleteViewRolesAsync} from "./deleteViewRoles";
import {getListViewRolesAsync} from "./list";
import {updateViewRolesAsync} from "./update";
import {CREATE_VIEW_ROLES, DELETE_VIEW_ROLES, GET_LIST_VIEW_ROLES, GET_SEARCH_VIEW_ROLES, UPDATE_VIEW_ROLES} from "../actions";
import {getSearchViewRolesAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(CREATE_VIEW_ROLES, createViewRolesAsync),
    yield takeLatest(DELETE_VIEW_ROLES, deleteViewRolesAsync),
    yield takeLatest(GET_LIST_VIEW_ROLES, getListViewRolesAsync),
    yield takeLatest(GET_SEARCH_VIEW_ROLES, getSearchViewRolesAsync),
    yield takeLatest(UPDATE_VIEW_ROLES, updateViewRolesAsync),
  ]);
}
