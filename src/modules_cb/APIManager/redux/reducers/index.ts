import {combineReducers} from "redux";
import list, {GetListApiState} from "./list";
import create, {CreateAPIState} from "./create";
import showForm, {ShowFormAPIState} from "./showForm";
import update, {UpdateAPIState} from "./update";
import deleteApi, {DeleteAPIState} from "./deleteApi";
import search, {SearchListApiState} from "./search";

export interface APIManagerModuleState {
  list: GetListApiState,
  search: SearchListApiState,
  create: CreateAPIState,
  deleteApi: DeleteAPIState,
  showForm: ShowFormAPIState,
  update: UpdateAPIState
}

export default combineReducers<APIManagerModuleState>({
  list,
  search,
  create,
  deleteApi,
  showForm,
  update
});
