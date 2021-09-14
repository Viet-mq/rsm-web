import {all, takeLatest} from 'redux-saga/effects';
import {getListViewFrontEnd} from "./list";
import {
  CREATE_VIEW_FRONT_END,
  DELETE_VIEW_FRONT_END,
  FRONT_END_ADD_ACTION,
  FRONT_END_REMOVE_ACTION,
  GET_LIST_FRONT_END_VIEW,
  UPDATE_VIEW_FRONT_END
} from "../actions";
import {createFrontEndAsync} from "./create";
import {updateFrontEndAsync} from "./update";
import {deleteFrontEndAsync} from "./deleteView";
import {addActionFrontEndAsync} from "./add_action";
import {removeActionFrontEndAsync} from "./remove_action";

export default function* root() {
  return all([
    yield takeLatest(GET_LIST_FRONT_END_VIEW, getListViewFrontEnd),
    yield takeLatest(CREATE_VIEW_FRONT_END, createFrontEndAsync),
    yield takeLatest(UPDATE_VIEW_FRONT_END, updateFrontEndAsync),
    yield takeLatest(DELETE_VIEW_FRONT_END, deleteFrontEndAsync),
    yield takeLatest(FRONT_END_ADD_ACTION, addActionFrontEndAsync),
    yield takeLatest(FRONT_END_REMOVE_ACTION, removeActionFrontEndAsync),
  ]);
}
