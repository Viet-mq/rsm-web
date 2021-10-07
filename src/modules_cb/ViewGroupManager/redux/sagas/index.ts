import {all, takeLatest} from 'redux-saga/effects';
import {getListMenuFrontendAsync} from "./menuView/list";
import {
  ADD_ACTION_VIEW,
  CREATE_MENU_FRONTEND, DELETE_MENU_FRONTEND,
  GET_LIST_MENU_FRONTEND, REMOVE_ACTION_VIEW, UPDATE_MENU_FRONTEND

} from "../actions";
import {createMenuFrontendAsync} from "./menuView/create";
import {deleteMenuFrontendAsync} from "./menuView/deleteMenu";
import {updateMenuFrontendAsync} from "./menuView/update";
import {addActionViewAsync} from "./view/add_view";
import {removeActionViewAsync} from "./view/remove_view";

export default function* root() {
  return all([
    yield takeLatest(GET_LIST_MENU_FRONTEND, getListMenuFrontendAsync),
    yield takeLatest(CREATE_MENU_FRONTEND,createMenuFrontendAsync),
    yield takeLatest(DELETE_MENU_FRONTEND,deleteMenuFrontendAsync),
    yield takeLatest(UPDATE_MENU_FRONTEND,updateMenuFrontendAsync),
    yield takeLatest(ADD_ACTION_VIEW,addActionViewAsync),
    yield takeLatest(REMOVE_ACTION_VIEW,removeActionViewAsync),

  ]);
}
