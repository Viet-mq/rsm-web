import {combineReducers} from "redux";
import list, {BlacklistListState} from "./list";
import deleteBlacklist, {DeleteBlacklistState} from "./deleteBlacklist";
import create, {CreateBlacklistState} from "./create";
import showForm, {BlacklistFormState} from "./showForm";
import update, {UpdateBlacklistState} from "./update";

export interface BlacklistManagerModuleState {
  list: BlacklistListState,
  deleteBlacklist: DeleteBlacklistState,
  create: CreateBlacklistState,
  showForm: BlacklistFormState,
  update: UpdateBlacklistState,
}

export default combineReducers<BlacklistManagerModuleState>({
  list,
  deleteBlacklist,
  create,
  showForm,
  update,
});
