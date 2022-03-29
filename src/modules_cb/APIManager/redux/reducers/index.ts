import {combineReducers} from "redux";
import list, {GetListApiState} from "./list";
import create, {CreateAPIState} from "./create";
import showForm, {ShowFormAPIState} from "./showForm";
import update, {UpdateAPIState} from "./update";
import deleteApi, {DeleteAPIState} from "./deleteApi";

export interface APIManagerModuleState {
  list: GetListApiState,
  create: CreateAPIState,
  deleteApi: DeleteAPIState,
  showForm: ShowFormAPIState,
  update: UpdateAPIState
}

export default combineReducers<APIManagerModuleState>({
  list,
  create,
  deleteApi,
  showForm,
  update
});
