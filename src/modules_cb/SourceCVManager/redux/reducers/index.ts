import {combineReducers} from "redux";
import list, {SourceCVListState} from "./list";
import deleteSourceCV, {DeleteSourceCVState} from "./deleteSourceCV";
import create, {CreateSourceCVState} from "./create";
import showForm, {SourceCVFormState} from "./showForm";
import update, {UpdateSourceCVState} from "./update";
import search, {SearchSourceCVState} from "./search";

export interface SourceCVManagerModuleState {
  list: SourceCVListState,
  deleteSourceCV: DeleteSourceCVState,
  create: CreateSourceCVState,
  showForm: SourceCVFormState,
  update: UpdateSourceCVState,
  search:SearchSourceCVState,
}

export default combineReducers<SourceCVManagerModuleState>({
  list,
  deleteSourceCV,
  create,
  showForm,
  update,
  search,
});
