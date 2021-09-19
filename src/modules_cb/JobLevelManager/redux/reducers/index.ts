import {combineReducers} from "redux";
import list, {JobLevelListState} from "./list";
import deleteJobLevel, {DeleteJobLevelState} from "./deleteJobLevel";
import create, {CreateJobLevelState} from "./create";
import showForm, {JobLevelFormState} from "./showForm";
import update, {UpdateJobLevelState} from "./update";

export interface JobLevelManagerModuleState {
  list: JobLevelListState,
  deleteJobLevel: DeleteJobLevelState,
  create: CreateJobLevelState,
  showForm: JobLevelFormState,
  update: UpdateJobLevelState,
}

export default combineReducers<JobLevelManagerModuleState>({
  list,
  deleteJobLevel,
  create,
  showForm,
  update,
});
