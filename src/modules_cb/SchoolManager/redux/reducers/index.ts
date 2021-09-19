import {combineReducers} from "redux";
import list, {SchoolListState} from "./list";
import deleteSchool, {DeleteSchoolState} from "./deleteSchool";
import create, {CreateSchoolState} from "./create";
import showForm, {SchoolFormState} from "./showForm";
import update, {UpdateSchoolState} from "./update";

export interface SchoolManagerModuleState {
  list: SchoolListState,
  deleteSchool: DeleteSchoolState,
  create: CreateSchoolState,
  showForm: SchoolFormState,
  update: UpdateSchoolState,
}

export default combineReducers<SchoolManagerModuleState>({
  list,
  deleteSchool,
  create,
  showForm,
  update,
});
