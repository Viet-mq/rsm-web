import {combineReducers} from "redux";
import list, {JobLevelListState} from "./list";
import deleteJobLevel, {DeleteJobLevelState} from "./deleteJobLevel";
import create, {CreateJobLevelState} from "./create";
import showForm, {JobLevelFormState} from "./showForm";
import update, {UpdateJobLevelState} from "./update";
import search, {SearchJobLevelState} from "./search";

export interface JobLevelManagerModuleState {
  list: JobLevelListState,
  deleteJobLevel: DeleteJobLevelState,
  create: CreateJobLevelState,
  showForm: JobLevelFormState,
  update: UpdateJobLevelState,
  search:SearchJobLevelState,
}

export default combineReducers<JobLevelManagerModuleState>({
  list,
  deleteJobLevel,
  create,
  showForm,
  update,
  search,
});
