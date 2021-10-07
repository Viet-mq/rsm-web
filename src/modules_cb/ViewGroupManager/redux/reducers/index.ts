import {combineReducers} from "redux";
import list, {GetListMenuFrontendState} from "./list";
import create, {CreateMenuFrontendState} from "./create";
import showForm, {ShowFormMenuFrontendState} from "./showForm";
import deleteMenu, {DeleteMenuFrontendState} from "./deleteMenu";
import update, {UpdateMenuFrontendState} from "./update";

export interface ViewGroupManagerModuleState {
  list: GetListMenuFrontendState,
  create: CreateMenuFrontendState,
  showForm: ShowFormMenuFrontendState,
  deleteMenu: DeleteMenuFrontendState,
  update: UpdateMenuFrontendState,
}

export default combineReducers<ViewGroupManagerModuleState>({
  list,
  create,
  showForm,
  deleteMenu,
  update
});
