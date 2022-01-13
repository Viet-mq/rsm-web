import {combineReducers} from "redux";
import list, {JobListState} from "./list";
import deleteJob, {DeleteJobState} from "./deleteJob";
import create, {CreateJobState} from "./create";
import showForm, {JobFormState} from "./showForm";
import update, {UpdateJobState} from "./update";

export interface JobManagerModuleState {
  list: JobListState,
  deleteJob: DeleteJobState,
  create: CreateJobState,
  showForm: JobFormState,
  update: UpdateJobState,
}

export default combineReducers<JobManagerModuleState>({
  list,
  deleteJob,
  create,
  showForm,
  update,
});
