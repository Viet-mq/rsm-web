import {combineReducers} from "redux";
import list, {GetListViewState} from "./list";
import create, {CreateViewState} from "./create";
import deleteView, {DeleteViewState} from "./deleteView";
import update, {UpdateViewState} from "./update";
import showForm, {ViewShowFormState} from "./showForm";
import add_action, {AddActionViewState} from "./add_action";
import remove_action, {RemoveActionViewState} from "./remove_action";
import update_action, {UpdateActionViewState} from "./update_action";
import detail, {GetDetailViewState} from "./detail";
import search, {SearchListViewState} from "./search";

export interface ViewManagerModuleState {
  list: GetListViewState,
  search: SearchListViewState,
  detail: GetDetailViewState,
  create: CreateViewState,
  update: UpdateViewState,
  showForm: ViewShowFormState,
  add_action: AddActionViewState,
  remove_action: RemoveActionViewState,
  update_action: UpdateActionViewState,
  deleteView: DeleteViewState
}

export default combineReducers<ViewManagerModuleState>({
  list,
  search,
  detail,
  create,
  update,
  showForm,
  add_action,
  remove_action,
  update_action,
  deleteView
});
