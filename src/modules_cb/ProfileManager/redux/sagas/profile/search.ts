import * as apis from "../../services/apis";
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {
  GetElasticSearchAction,
  getElasticSearchError,
  getElasticSearchResultSuccess,
  getElasticSearchSuccess
} from "../../actions";

export function* searchAsync(action: GetElasticSearchAction) {
  try {
    const rs = yield apis.getElasticSearch(action.request);
    if (action.request?.size === 10) {
      yield put(getElasticSearchSuccess(rs.total, rs.rows));
    } else {
      yield put(getElasticSearchResultSuccess(rs.total, rs.rows));
    }

    if (rs.code !== 0) {
    } else {
    }
  } catch (e) {
    yield put(getElasticSearchError(new AppError(e.message)));
  }
}
