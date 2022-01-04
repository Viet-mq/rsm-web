import {all, takeLatest} from 'redux-saga/effects';
import {getChatBotContentAsync} from "./list";
import {CREATE_CB_CONTENT, GET_CB_CONTENT} from '../actions';
import {createChatBotContentAsync} from "./create";

export default function* root() {
  return all([
    yield takeLatest(GET_CB_CONTENT, getChatBotContentAsync),
    yield takeLatest(CREATE_CB_CONTENT, createChatBotContentAsync),
  ]);
}
