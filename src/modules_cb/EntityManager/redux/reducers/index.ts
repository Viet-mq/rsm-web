import {combineReducers} from 'redux';

import list, {EntityListState} from "./list";
import form, {EntityFormState} from "./showForm";
import create, {CreateChatBotEntityModuleState} from "./create";
import deleteState, {DeleteEntityState} from "./deleteEntity";
import update, {UpdateEntityState} from "./update";

export interface EntityChatBotModuleState {
  list: EntityListState,
  form: EntityFormState,
  create: CreateChatBotEntityModuleState,
  update: UpdateEntityState,
  deleteState: DeleteEntityState
}

export default combineReducers<EntityChatBotModuleState>({
  list,
  form,
  create,
  update,
  deleteState
});
