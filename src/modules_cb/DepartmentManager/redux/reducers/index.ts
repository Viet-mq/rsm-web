import {combineReducers} from "redux";
import list, {DepartmentListState} from "./list";
import deleteDepartment, {DeleteDepartmentState} from "./deleteDepartment";
import create, {CreateDepartmentState} from "./create";
import showForm, {DepartmentFormState} from "./showForm";
import update, {UpdateDepartmentState} from "./update";

export interface DepartmentManagerModuleState {
  list: DepartmentListState,
  deleteDepartment: DeleteDepartmentState,
  create: CreateDepartmentState,
  showForm: DepartmentFormState,
  update: UpdateDepartmentState,
}

export default combineReducers<DepartmentManagerModuleState>({
  list,
  deleteDepartment,
  create,
  showForm,
  update,
});
