import {combineReducers} from "redux";
import list, {DepartmentListState} from "./list";
import deleteDepartment, {DeleteDepartmentState} from "./deleteDepartment";
import create, {CreateDepartmentState} from "./create";
import showForm, {DepartmentFormState} from "./showForm";
import update, {UpdateDepartmentState} from "./update";
import search, {SearchListDepartmentState} from "./search";

export interface DepartmentManagerModuleState {
  list: DepartmentListState,
  deleteDepartment: DeleteDepartmentState,
  create: CreateDepartmentState,
  showForm: DepartmentFormState,
  update: UpdateDepartmentState,
  search:SearchListDepartmentState
}

export default combineReducers<DepartmentManagerModuleState>({
  list,
  deleteDepartment,
  create,
  showForm,
  update,
  search,
});
