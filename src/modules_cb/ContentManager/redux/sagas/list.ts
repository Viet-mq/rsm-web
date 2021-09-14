import {getListContentError, getListContentSuccess, ListContentAction} from "../actions";
import * as apis from '../services/apis';
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";

export function* getChatBotContentAsync(action: ListContentAction) {
  try {
    const rs = yield apis.getListChatBotContent(action.params);
    console.log("rs: " + JSON.stringify(rs));
    yield put(getListContentSuccess(rs.total, rs.rows));
  } catch (e) {
    yield put(getListContentError(new AppError(e.message)));
  }
}
