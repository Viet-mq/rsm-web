import {combineReducers} from "redux";
import list, {RolesListState} from "./list";
import deleteRoles, {DeleteRolesState} from "./deleteRoles";
import create, {CreateRolesState} from "./create";
import showForm, {ShowRolesFormState} from "./showForm";
import update, {UpdateRolesState} from "./update";
import search, {SearchRolesState} from "./search";

export interface RolesManagerModuleState {
  list: RolesListState,
  search: SearchRolesState,
  deleteRoles: DeleteRolesState,
  create: CreateRolesState,
  showForm: ShowRolesFormState,
  update: UpdateRolesState,
}

export default combineReducers<RolesManagerModuleState>({
  list,
  deleteRoles,
  create,
  showForm,
  update,
  search,
});
