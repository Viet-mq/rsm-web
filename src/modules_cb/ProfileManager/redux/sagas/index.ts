import {all, takeLatest} from 'redux-saga/effects';
import {createProfileAsync} from "./profile/create";
import {deleteProfileAsync} from "./profile/deleteProfile";
import {getListProfileAsync} from "./profile/list";
import {updateProfileAsync} from "./profile/update";
import {getDetailProfileAsync} from "./detail/detail";
import {
  CREATE_BOOKING, CREATE_NOTE,
  CREATE_PROFILE, DELETE_NOTE,
  DELETE_PROFILE,
  GET_ACTIVITY,
  GET_BOOKING,
  GET_DETAIL_PROFILE,
  GET_ELASTIC_SEARCH, GET_LIST_NOTE,
  GET_LIST_PROFILE,
  UPDATE_BOOKING,
  UPDATE_DETAIL, UPDATE_NOTE,
  UPDATE_PROFILE,
  UPLOAD_LIST_CV,
  UPLOADCV
} from "../actions";
import {uploadCVAsync} from "./cv/uploadCV";
import {getBookingAsync} from "./booking/getBooking";
import {updateBookingAsync} from "./booking/updateBooking";
import {getActivityLogsAsync} from "./detail/getActivityLogs";
import {createBookingAsync} from "./booking/createBooking";
import {searchAsync} from "./profile/search";
import {updateDetailAsync} from "./detail/updateDetail";
import {uploadListCVAsync} from "./cv/uploadListCV";
import {getListNoteAsync} from "./note/getNote";
import {createNoteAsync} from "./note/createNote";
import {updateNoteAsync} from "./note/updateNote";
import {deleteNoteAsync} from "./note/deleteNote";

export default function* root() {
  return all([
    yield takeLatest(CREATE_PROFILE, createProfileAsync),
    yield takeLatest(DELETE_PROFILE, deleteProfileAsync),
    yield takeLatest(GET_LIST_PROFILE, getListProfileAsync),
    yield takeLatest(UPDATE_PROFILE, updateProfileAsync),
    yield takeLatest(UPDATE_DETAIL, updateDetailAsync),
    yield takeLatest(GET_DETAIL_PROFILE, getDetailProfileAsync),
    yield takeLatest(UPLOADCV, uploadCVAsync),
    yield takeLatest(UPLOAD_LIST_CV, uploadListCVAsync),
    yield takeLatest(GET_BOOKING, getBookingAsync),
    yield takeLatest(CREATE_BOOKING, createBookingAsync),
    yield takeLatest(UPDATE_BOOKING, updateBookingAsync),
    yield takeLatest(GET_ACTIVITY, getActivityLogsAsync),
    yield takeLatest(GET_ELASTIC_SEARCH, searchAsync),
    yield takeLatest(GET_LIST_NOTE, getListNoteAsync),
    yield takeLatest(CREATE_NOTE, createNoteAsync),
    yield takeLatest(UPDATE_NOTE, updateNoteAsync),
    yield takeLatest(DELETE_NOTE, deleteNoteAsync),

  ]);
}
