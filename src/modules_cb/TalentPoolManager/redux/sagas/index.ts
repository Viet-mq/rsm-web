import {all, takeLatest} from 'redux-saga/effects';
import {createTalentPoolAsync} from "./create";
import {deleteTalentPoolAsync} from "./deleteTalentPool";
import {getListTalentPoolAsync} from "./list";
import {updateTalentPoolAsync} from "./update";
import {
  CREATE_TALENT_POOL,
  DELETE_TALENT_POOL,
  GET_DETAIL_TALENT_POOL,
  GET_LIST_TALENT_POOL, GET_SEARCH_TALENT_POOL,
  UPDATE_TALENT_POOL
} from "../actions";
import {getDetailTalentPoolAsync} from "./detail";
import {getSearchTalentPoolAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(CREATE_TALENT_POOL, createTalentPoolAsync),
    yield takeLatest(DELETE_TALENT_POOL, deleteTalentPoolAsync),
    yield takeLatest(GET_LIST_TALENT_POOL, getListTalentPoolAsync),
    yield takeLatest(UPDATE_TALENT_POOL, updateTalentPoolAsync),
    yield takeLatest(GET_DETAIL_TALENT_POOL, getDetailTalentPoolAsync),
    yield takeLatest(GET_SEARCH_TALENT_POOL, getSearchTalentPoolAsync),
  ]);
}
