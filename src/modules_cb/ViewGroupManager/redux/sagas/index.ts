import {all, takeLatest} from 'redux-saga/effects';
import {getListMenuFrontendAsync} from "./list";
import {
  CREATE_MENU_FRONTEND, DELETE_MENU_FRONTEND,
  GET_LIST_MENU_FRONTEND, UPDATE_MENU_FRONTEND

} from "../actions";
import {createMenuFrontendAsync} from "./create";
import {deleteMenuFrontendAsync} from "./deleteMenu";
import {updateMenuFrontendAsync} from "./update";

export default function* root() {
  return all([
    yield takeLatest(GET_LIST_MENU_FRONTEND, getListMenuFrontendAsync),
    yield takeLatest(CREATE_MENU_FRONTEND,createMenuFrontendAsync),
    yield takeLatest(DELETE_MENU_FRONTEND,deleteMenuFrontendAsync),
    yield takeLatest(UPDATE_MENU_FRONTEND,updateMenuFrontendAsync),
  ]);
}
