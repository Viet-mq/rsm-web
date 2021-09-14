import {combineReducers} from "redux";
import list, {GetListFrontendViewState} from "./list";
import create, {CreateViewState} from "./create";
import deleteView, {DeleteViewState} from "./deleteView";
import update, {UpdateViewState} from "./update";
import showForm, {ViewShowFormState} from "./showForm";
import add_action, {AddActionViewState} from "./add_action";
import remove_action, {RemoveActionViewState} from "./remove_action";

export interface ViewManagerModuleState {
  list: GetListFrontendViewState,
  create: CreateViewState,
  update: UpdateViewState,
  showForm: ViewShowFormState,
  add_action: AddActionViewState,
  remove_action: RemoveActionViewState,
  deleteView: DeleteViewState
}

export default combineReducers<ViewManagerModuleState>({
  list,
  create,
  update,
  showForm,
  add_action,
  remove_action,
  deleteView
});
