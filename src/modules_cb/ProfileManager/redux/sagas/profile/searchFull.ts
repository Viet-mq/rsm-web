import * as apis from "../../services/apis";
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {GetElasticSearchAction, getElasticSearchError, getFullElasticSearchSuccess} from "../../actions";

export function* searchFullAsync(action: GetElasticSearchAction) {
  try {
    const rs = yield apis.getElasticSearch(action.requestSearchFull);
    yield put(getFullElasticSearchSuccess(rs.total, rs.rows));
  } catch (e) {
    yield put(getElasticSearchError(new AppError(e.message)));
  }
}
