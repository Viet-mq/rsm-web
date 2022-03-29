import {all, takeLatest} from 'redux-saga/effects';
import {createAPIRolesAsync} from "./create";
import {deleteAPIRolesAsync} from "./deleteAPIRoles";
import {getListAPIRolesAsync} from "./list";
import {updateAPIRolesAsync} from "./update";
import {CREATE_API_ROLES, DELETE_API_ROLES, GET_LIST_API_ROLES, GET_SEARCH_API_ROLES, UPDATE_API_ROLES} from "../actions";
import {getSearchAPIRolesAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(CREATE_API_ROLES, createAPIRolesAsync),
    yield takeLatest(DELETE_API_ROLES, deleteAPIRolesAsync),
    yield takeLatest(GET_LIST_API_ROLES, getListAPIRolesAsync),
    yield takeLatest(GET_SEARCH_API_ROLES, getSearchAPIRolesAsync),
    yield takeLatest(UPDATE_API_ROLES, updateAPIRolesAsync),
  ]);
}
