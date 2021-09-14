import {all, takeLatest} from 'redux-saga/effects';
import {createChatBotAsync} from "./create";
import {getListChatBots} from "./list";
import {deleteChatBot} from "./deleteBot";
import {updateChatBotAsync} from "./update";
import {CREATE_CHAT_BOT, DELETE_CHAT_BOT, GET_LIST_CHAT_BOT, UPDATE_CHAT_BOT} from '../actions';

export default function* root() {
  return all([
    yield takeLatest(CREATE_CHAT_BOT, createChatBotAsync),
    yield takeLatest(GET_LIST_CHAT_BOT, getListChatBots),
    yield takeLatest(DELETE_CHAT_BOT, deleteChatBot),
    yield takeLatest(UPDATE_CHAT_BOT, updateChatBotAsync),
    // yield takeLatest(
    //   [CREATE_WORKINGSHIFT_SUCCESS, UPDATE_WORKINGSHIFT],
    //   getWorkingShiftsAsync,
    // ),
  ]);
}
