import {all, takeLatest} from 'redux-saga/effects';
import {createProfileAsync} from "./create";
import {deleteProfileAsync} from "./deleteProfile";
import {getListProfileAsync} from "./list";
import {updateProfileAsync} from "./update";
import {getDetailProfileAsync} from "./detail";
import {CREATE_PROFILE, DELETE_PROFILE, GET_LIST_PROFILE, UPDATE_PROFILE, UPLOADCV, GET_DETAIL_PROFILE} from "../actions";
import {uploadCVAsync} from "./uploadCV";

export default function* root() {
  return all([
    yield takeLatest(CREATE_PROFILE, createProfileAsync),
    yield takeLatest(DELETE_PROFILE, deleteProfileAsync),
    yield takeLatest(GET_LIST_PROFILE, getListProfileAsync),
    yield takeLatest(UPDATE_PROFILE, updateProfileAsync),
    yield takeLatest(GET_DETAIL_PROFILE, getDetailProfileAsync),
    yield takeLatest(UPLOADCV, uploadCVAsync),

  ]);
}
