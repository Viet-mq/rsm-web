import {all, takeLatest} from 'redux-saga/effects';
import {addAPIAsync} from "./api/add_api";
import {
  ADD_API,
  ASSIGN_USER, CREATE_GROUP_API,
  DELETE_GROUP_API,
  GET_LIST_GROUP_API,
  REMOVE_API,
  REVOKE_USER,
  UPDATE_GROUP_API
} from "../actions";
import {deleteGroupAPIAsync} from "./group_api/deleteGroupAPI";
import {getListGroupAPIAsync} from "./group_api/list";
import {updateGroupAPIAsync} from "./group_api/update";
import {assignUserAsync} from "./user/assign_user";
import {revokeUserAsync} from "./user/revoke_user";
import {removeAPIAsync} from "./api/remove_api";
import {createGroupAPIAsync} from "./group_api/create";

export default function* root() {
  return all([
    yield takeLatest(ADD_API, addAPIAsync),
    yield takeLatest(REMOVE_API, removeAPIAsync),
    yield takeLatest(DELETE_GROUP_API, deleteGroupAPIAsync),
    yield takeLatest(GET_LIST_GROUP_API, getListGroupAPIAsync),
    yield takeLatest(UPDATE_GROUP_API, updateGroupAPIAsync),
    yield takeLatest(ASSIGN_USER, assignUserAsync),
    yield takeLatest(REVOKE_USER, revokeUserAsync),
    yield takeLatest(CREATE_GROUP_API, createGroupAPIAsync),
  ]);
}
