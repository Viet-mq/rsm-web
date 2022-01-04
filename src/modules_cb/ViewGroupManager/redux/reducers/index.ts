import {combineReducers} from "redux";
import list, {GetListMenuFrontendState} from "./menuView/list";
import create, {CreateMenuFrontendState} from "./menuView/create";
import showForm, {ShowFormMenuFrontendState} from "./showForm";
import deleteMenu, {DeleteMenuFrontendState} from "./menuView/deleteMenu";
import update, {UpdateMenuFrontendState} from "./menuView/update";
import addActionView,{AddActionViewState} from "./view/add_action_view";
import removeActionView,{RemoveActionViewState} from "./view/remove_action_view";

export interface ViewGroupManagerModuleState {
  list: GetListMenuFrontendState,
  create: CreateMenuFrontendState,
  showForm: ShowFormMenuFrontendState,
  deleteMenu: DeleteMenuFrontendState,
  update: UpdateMenuFrontendState,
  addActionView:AddActionViewState,
  removeActionView:RemoveActionViewState
}

export default combineReducers<ViewGroupManagerModuleState>({
  list,
  create,
  showForm,
  deleteMenu,
  update,
  addActionView,
  removeActionView
});
