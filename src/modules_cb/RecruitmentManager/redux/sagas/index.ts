import {all, takeLatest} from 'redux-saga/effects';
import {createRecruitmentAsync} from "./create";
import {deleteRecruitmentAsync} from "./deleteRecruitment";
import {getListRecruitmentAsync} from "./list";
import {updateRecruitmentAsync} from "./update";
import {
  CREATE_RECRUITMENT,
  DELETE_RECRUITMENT,
  GET_DETAIL_RECRUITMENT,
  GET_LIST_RECRUITMENT,
  UPDATE_RECRUITMENT
} from "../actions";
import {getDetailRecruitmentAsync} from "./detail";

export default function* root() {
  return all([
    yield takeLatest(CREATE_RECRUITMENT, createRecruitmentAsync),
    yield takeLatest(DELETE_RECRUITMENT, deleteRecruitmentAsync),
    yield takeLatest(GET_LIST_RECRUITMENT, getListRecruitmentAsync),
    yield takeLatest(GET_DETAIL_RECRUITMENT, getDetailRecruitmentAsync),
    yield takeLatest(UPDATE_RECRUITMENT, updateRecruitmentAsync),
  ]);
}
