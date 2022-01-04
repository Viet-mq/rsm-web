import {getListChatBotsError, getListChatBotsSuccess, ListChatBotAction} from "../actions";
import * as apis from '../services/apis';
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";

export function* getListChatBots(action: ListChatBotAction) {
  try {
    const rs = yield apis.getListChatBots(action.params);
    console.log("rs: " + JSON.stringify(rs));
    yield put(getListChatBotsSuccess(rs));
  } catch (e) {
    yield put(getListChatBotsError(new AppError(e.message)));
  }
}
