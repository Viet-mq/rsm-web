import {all, takeLatest} from 'redux-saga/effects';
import {CREATE_API_GROUP, DELETE_API_GROUP, GET_LIST_API_GROUP_ACTION, UPDATE_API_GROUP} from "../actions";
import {getListGroupApiRoleAsync} from "./list";
import {createGroupApiAsync} from "./create";
import {updateGroupApiAsync} from "./update";
import {deleteGroupApiAsync} from "./deleteGroup";

export default function* root() {
  return all([
    yield takeLatest(GET_LIST_API_GROUP_ACTION, getListGroupApiRoleAsync),
    yield takeLatest(CREATE_API_GROUP, createGroupApiAsync),
    yield takeLatest(UPDATE_API_GROUP, updateGroupApiAsync),
    yield takeLatest(DELETE_API_GROUP, deleteGroupApiAsync),
  ]);
}
