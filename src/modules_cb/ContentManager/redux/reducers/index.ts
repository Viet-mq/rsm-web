import {combineReducers} from "redux";
import list, {ListContentState} from "./list";
import create, {CreateContentState} from "./create";
import showForm, {ContentFormState} from "./showForm";

export interface ContentManagerModuleState {
  list: ListContentState,
  showForm: ContentFormState,
  create: CreateContentState
}

export default combineReducers<ContentManagerModuleState>({
  list,
  showForm,
  create
});
