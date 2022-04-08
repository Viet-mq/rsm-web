import {combineReducers} from "redux";
import list, {StatusCVListState} from "./list";
import deleteStatusCV, {DeleteStatusCVState} from "./deleteStatusCV";
import create, {CreateStatusCVState} from "./create";
import showForm, {StatusCVFormState} from "./showForm";
import update, {UpdateStatusCVState} from "./update";
import updateAll, {UpdateAllStatusCVState} from "./updateAll";

export interface StatusCVManagerModuleState {
  list: StatusCVListState,
  deleteStatusCV: DeleteStatusCVState,
  create: CreateStatusCVState,
  showForm: StatusCVFormState,
  update: UpdateStatusCVState,
  updateAll: UpdateAllStatusCVState,
}

export default combineReducers<StatusCVManagerModuleState>({
  list,
  deleteStatusCV,
  create,
  showForm,
  update,
  updateAll,
});
