import {all, takeLatest} from 'redux-saga/effects';
import {getListChatBotEntityAsync} from "./list";
import {createEntityAsync} from "./create";
import {deleteEntityAsync} from "./deleteEntity";
import {updateEntityAsync} from "./update";
import {
  CREATE_CHAT_BOT_ENTITY,
  ENTITY_CHAT_BOT_DELETE,
  ENTITY_CHAT_BOT_GET_LIST,
  ENTITY_CHAT_BOT_GET_LIST_WITHOUT_IN_PARAMS,
  UPDATE_CHAT_BOT_ENTITY
} from '../actions';

export default function* root() {
  return all([
    yield takeLatest([ENTITY_CHAT_BOT_GET_LIST, ENTITY_CHAT_BOT_GET_LIST_WITHOUT_IN_PARAMS], getListChatBotEntityAsync),
    yield takeLatest(CREATE_CHAT_BOT_ENTITY, createEntityAsync),
    yield takeLatest(ENTITY_CHAT_BOT_DELETE, deleteEntityAsync),
    yield takeLatest(UPDATE_CHAT_BOT_ENTITY, updateEntityAsync),
  ]);
}
