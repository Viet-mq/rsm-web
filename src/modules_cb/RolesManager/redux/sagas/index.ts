import {all, takeLatest} from 'redux-saga/effects';
import {createRolesAsync} from "./create";
import {deleteRolesAsync} from "./deleteRoles";
import {getListRolesAsync} from "./list";
import {updateRolesAsync} from "./update";
import {CREATE_ROLES, DELETE_ROLES, GET_LIST_ROLES, GET_SEARCH_ROLES, UPDATE_ROLES} from "../actions";
import {getSearchRolesAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(CREATE_ROLES, createRolesAsync),
    yield takeLatest(DELETE_ROLES, deleteRolesAsync),
    yield takeLatest(GET_LIST_ROLES, getListRolesAsync),
    yield takeLatest(GET_SEARCH_ROLES, getSearchRolesAsync),
    yield takeLatest(UPDATE_ROLES, updateRolesAsync),
  ]);
}
