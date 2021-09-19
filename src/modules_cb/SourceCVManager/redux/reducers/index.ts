import {combineReducers} from "redux";
import list, {SourceCVListState} from "./list";
import deleteSourceCV, {DeleteSourceCVState} from "./deleteSourceCV";
import create, {CreateSourceCVState} from "./create";
import showForm, {SourceCVFormState} from "./showForm";
import update, {UpdateSourceCVState} from "./update";

export interface SourceCVManagerModuleState {
  list: SourceCVListState,
  deleteSourceCV: DeleteSourceCVState,
  create: CreateSourceCVState,
  showForm: SourceCVFormState,
  update: UpdateSourceCVState,
}

export default combineReducers<SourceCVManagerModuleState>({
  list,
  deleteSourceCV,
  create,
  showForm,
  update,
});
