import {GetListScriptAction, getListScriptError, getListScriptSuccess} from "../actions";
import * as apis from '../services/apis';
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";

export function* getScriptAsync(action: GetListScriptAction) {
  try {
    const rs = yield apis.getListScript(action.params);
    yield put(getListScriptSuccess( rs.rows,rs.total));
  } catch (e) {
    yield put(getListScriptError(new AppError(e.message)));
  }
}
