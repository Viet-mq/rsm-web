import {combineReducers} from "redux";
import list, {ListIntentState} from "./list";
import showForm, {IntentManagerFormState} from "./showForm";
import create, {CreateIntentState} from "./create";
import deleteIntent, {DeleteIntentState} from "./deleteIntent";
import update, {UpdateIntentState} from "./update";

export interface IntentManagerModuleState {
  list: ListIntentState,
  create: CreateIntentState,
  update: UpdateIntentState,
  deleteIntent: DeleteIntentState,
  showForm: IntentManagerFormState
}

export default combineReducers<IntentManagerModuleState>({
  list,
  create,
  deleteIntent,
  update,
  showForm
})
