import {all, takeLatest} from 'redux-saga/effects';
import {createProfileAsync} from "./profile/create";
import {deleteProfileAsync} from "./profile/deleteProfile";
import {getListProfileAsync} from "./profile/list";
import {updateProfileAsync} from "./profile/update";
import {getDetailProfileAsync} from "./detail/detail";
import {
  ADD_TO_BLACKLIST,
  ADD_TO_TALENT_POOL,
  CHANGE_PROCESS,
  CREATE_BOOKING,
  CREATE_COMMENT,
  CREATE_NOTE,
  CREATE_PROFILE,
  CREATE_REJECT_CANDIDATE,
  DELETE_COMMENT,
  DELETE_CV,
  DELETE_NOTE,
  DELETE_PROFILE,
  GET_ACTIVITY,
  GET_BOOKING,
  GET_DETAIL_PROFILE,
  GET_ELASTIC_SEARCH,
  GET_FULL_ELASTIC_SEARCH,
  GET_LIST_COMMENT,
  GET_LIST_NOTE,
  GET_LIST_PROFILE,
  UPDATE_BOOKING,
  UPDATE_COMMENT,
  UPDATE_DETAIL,
  UPDATE_NOTE,
  UPDATE_PROFILE,
  UPLOAD_AVATAR,
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
import {getListCommentAsync} from "./comment/getComment";
import {createCommentAsync} from "./comment/createComment";
import {updateCommentAsync} from "./comment/updateComment";
import {deleteCommentAsync} from "./comment/deleteComment";
import {uploadAvatarAsync} from "./profile/uploadAvatar";
import {createRejectCandidateAsync} from "./profile/createRejectCandidate";
import {changeProcessAsync} from "./profile/changeProcess";
import {changeTalentPoolAsync} from "./profile/addToTalentPool";
import {searchFullAsync} from "./profile/searchFull";
import {deleteCVAsync} from "./cv/deleteCV";
import {changeBlacklistAsync} from "./profile/addToBlacklist";

export default function* root() {
  return all([
    yield takeLatest(CREATE_PROFILE, createProfileAsync),
    yield takeLatest(DELETE_PROFILE, deleteProfileAsync),
    yield takeLatest(GET_LIST_PROFILE, getListProfileAsync),
    yield takeLatest(UPDATE_PROFILE, updateProfileAsync),
    yield takeLatest(UPDATE_DETAIL, updateDetailAsync),
    yield takeLatest(GET_DETAIL_PROFILE, getDetailProfileAsync),
    yield takeLatest(UPLOADCV, uploadCVAsync),
    yield takeLatest(DELETE_CV, deleteCVAsync),
    yield takeLatest(UPLOAD_LIST_CV, uploadListCVAsync),
    yield takeLatest(GET_BOOKING, getBookingAsync),
    yield takeLatest(CREATE_BOOKING, createBookingAsync),
    yield takeLatest(UPDATE_BOOKING, updateBookingAsync),
    yield takeLatest(GET_ACTIVITY, getActivityLogsAsync),
    yield takeLatest(GET_ELASTIC_SEARCH, searchAsync),
    yield takeLatest(GET_FULL_ELASTIC_SEARCH, searchFullAsync),
    yield takeLatest(GET_LIST_NOTE, getListNoteAsync),
    yield takeLatest(CREATE_NOTE, createNoteAsync),
    yield takeLatest(UPDATE_NOTE, updateNoteAsync),
    yield takeLatest(DELETE_NOTE, deleteNoteAsync),
    yield takeLatest(GET_LIST_COMMENT, getListCommentAsync),
    yield takeLatest(CREATE_COMMENT, createCommentAsync),
    yield takeLatest(UPDATE_COMMENT, updateCommentAsync),
    yield takeLatest(DELETE_COMMENT, deleteCommentAsync),
    yield takeLatest(UPLOAD_AVATAR, uploadAvatarAsync),
    yield takeLatest(CREATE_REJECT_CANDIDATE, createRejectCandidateAsync),
    yield takeLatest(CHANGE_PROCESS, changeProcessAsync),
    yield takeLatest(ADD_TO_TALENT_POOL, changeTalentPoolAsync),
    yield takeLatest(ADD_TO_BLACKLIST, changeBlacklistAsync),

  ]);
}
