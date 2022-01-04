import {all, takeLatest} from 'redux-saga/effects';
import {GET_LIST_INTENT, INTENT_CREATE, INTENT_DELETE, INTENT_UPDATE} from "../actions";
import {getListIntentAsync} from "./list";
import {createIntentAsync} from "./create";
import {deleteIntentAsync} from "./deleteIntent";
import {updateIntentAsync} from "./update";

export default function* root() {
  return all([
    yield takeLatest(GET_LIST_INTENT, getListIntentAsync),
    yield takeLatest(INTENT_CREATE, createIntentAsync),
    yield takeLatest(INTENT_DELETE, deleteIntentAsync),
    yield takeLatest(INTENT_UPDATE, updateIntentAsync),
  ]);
}
