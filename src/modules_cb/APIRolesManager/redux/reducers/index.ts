import {combineReducers} from "redux";
import list, {APIRolesListState} from "./list";
import deleteAPIRoles, {DeleteAPIRolesState} from "./deleteAPIRoles";
import create, {CreateAPIRolesState} from "./create";
import showForm, {ShowAPIRolesFormState} from "./showForm";
import update, {UpdateAPIRolesState} from "./update";
import search, {SearchAPIRolesState} from "./search";

export interface APIRolesManagerModuleState {
  list: APIRolesListState,
  search: SearchAPIRolesState,
  deleteAPIRoles: DeleteAPIRolesState,
  create: CreateAPIRolesState,
  showForm: ShowAPIRolesFormState,
  update: UpdateAPIRolesState,
}

export default combineReducers<APIRolesManagerModuleState>({
  list,
  deleteAPIRoles,
  create,
  showForm,
  update,
  search,
});
