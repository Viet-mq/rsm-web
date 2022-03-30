import {combineReducers} from "redux";
import list, {ViewRolesListState} from "./list";
import deleteViewRoles, {DeleteViewRolesState} from "./deleteViewRoles";
import create, {CreateViewRolesState} from "./create";
import showForm, {ShowViewRolesFormState} from "./showForm";
import update, {UpdateViewRolesState} from "./update";
import search, {SearchViewRolesState} from "./search";

export interface ViewRolesManagerModuleState {
  list: ViewRolesListState,
  search: SearchViewRolesState,
  deleteViewRoles: DeleteViewRolesState,
  create: CreateViewRolesState,
  showForm: ShowViewRolesFormState,
  update: UpdateViewRolesState,
}

export default combineReducers<ViewRolesManagerModuleState>({
  list,
  deleteViewRoles,
  create,
  showForm,
  update,
  search,
});
