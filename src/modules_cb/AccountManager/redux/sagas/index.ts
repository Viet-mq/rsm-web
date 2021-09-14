import {all, takeLatest} from 'redux-saga/effects';
import {createAccountAsync} from "./create";
import {deleteAccountAsync} from "./deleteAccount";
import {getListAccountAsync} from "./list";
import {updateAccountAsync} from "./update";
import {changePasswordAsync} from "./changePassword";
import {CHANGE_PASSWORD_ACCOUNT, CREATE_ACCOUNT, DELETE_ACCOUNT, GET_LIST_ACCOUNT, UPDATE_ACCOUNT} from "../actions";

export default function* root() {
  return all([
    yield takeLatest(CREATE_ACCOUNT, createAccountAsync),
    yield takeLatest(DELETE_ACCOUNT, deleteAccountAsync),
    yield takeLatest(GET_LIST_ACCOUNT, getListAccountAsync),
    yield takeLatest(UPDATE_ACCOUNT, updateAccountAsync),
    yield takeLatest(CHANGE_PASSWORD_ACCOUNT, changePasswordAsync),
  ]);
}
