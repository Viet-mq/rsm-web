import {all, takeLatest} from 'redux-saga/effects';
import {createReasonRejectAsync} from "./create";
import {deleteReasonRejectAsync} from "./deleteReasonReject";
import {getListReasonRejectAsync} from "./list";
import {updateReasonRejectAsync} from "./update";
import {
  CREATE_REASON_REJECT,
  DELETE_REASON_REJECT,
  GET_LIST_REASON_REJECT,
  SEARCH_LIST_REASON_REJECT,
  UPDATE_REASON_REJECT
} from "../actions";
import {searchListReasonRejectAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(CREATE_REASON_REJECT, createReasonRejectAsync),
    yield takeLatest(DELETE_REASON_REJECT, deleteReasonRejectAsync),
    yield takeLatest(GET_LIST_REASON_REJECT, getListReasonRejectAsync),
    yield takeLatest(SEARCH_LIST_REASON_REJECT, searchListReasonRejectAsync),
    yield takeLatest(UPDATE_REASON_REJECT, updateReasonRejectAsync),
  ]);
}
