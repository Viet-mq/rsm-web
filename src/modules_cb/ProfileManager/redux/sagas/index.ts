import {all, takeLatest} from 'redux-saga/effects';
import {createProfileAsync} from "./profile/create";
import {deleteProfileAsync} from "./profile/deleteProfile";
import {getListProfileAsync} from "./profile/list";
import {updateProfileAsync} from "./profile/update";
import {getDetailProfileAsync} from "./detail/detail";
import {
  CREATE_PROFILE,
  DELETE_PROFILE,
  GET_LIST_PROFILE,
  UPDATE_PROFILE,
  UPLOADCV,
  GET_DETAIL_PROFILE,
  GET_BOOKING, CREATE_BOOKING, UPDATE_BOOKING, GET_ACTIVITY, GET_ELASTIC_SEARCH, UPDATE_DETAIL, UPLOAD_LIST_CV
} from "../actions";
import {uploadCVAsync} from "./cv/uploadCV";
import {getBookingAsync} from "./booking/getBooking";
import {updateBookingAsync} from "./booking/updateBooking";
import {getActivityLogsAsync} from "./detail/getActivityLogs";
import {createBookingAsync} from "./booking/createBooking";
import {searchAsync} from "./profile/search";
import {updateDetailAsync} from "./detail/updateDetail";
import {uploadListCVAsync} from "./cv/uploadListCV";

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
    yield takeLatest(GET_BOOKING,getBookingAsync),
    yield takeLatest(CREATE_BOOKING,createBookingAsync),
    yield takeLatest(UPDATE_BOOKING,updateBookingAsync),
    yield takeLatest(GET_ACTIVITY,getActivityLogsAsync),
    yield takeLatest(GET_ELASTIC_SEARCH,searchAsync),

  ]);
}
