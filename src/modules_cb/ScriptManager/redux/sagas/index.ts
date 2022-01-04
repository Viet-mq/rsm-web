import {all, takeLatest} from 'redux-saga/effects';
import {
  ADD_STEP_SCRIPT,
  CREATE_SCRIPT,
  DELETE_SCRIPT,
  GET_LIST_SCRIPT,
  REMOVE_STEP_SCRIPT,
  UPDATE_SCRIPT,
  UPDATE_STEP_SCRIPT
} from "../actions";
import {createScriptAsync} from "./create";
import {updateScriptAsync} from "./update";
import {deleteScriptAsync} from "./delete_script";
import {getScriptAsync} from "./list";
import {addStepScriptAsync} from "./add_step";
import {removeStepScriptAsync} from "./remove_step";
import {updateStepScriptAsync} from "./update_step";

export default function* root() {
  return all([
    yield takeLatest(CREATE_SCRIPT, createScriptAsync),
    yield takeLatest(UPDATE_SCRIPT, updateScriptAsync),
    yield takeLatest(DELETE_SCRIPT, deleteScriptAsync),
    yield takeLatest(GET_LIST_SCRIPT, getScriptAsync),
    yield takeLatest(ADD_STEP_SCRIPT, addStepScriptAsync),
    yield takeLatest(UPDATE_STEP_SCRIPT, updateStepScriptAsync),
    yield takeLatest(REMOVE_STEP_SCRIPT, removeStepScriptAsync),
  ]);
}
