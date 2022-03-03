import {combineReducers} from "redux";
import list, {JobListState} from "./list";
import deleteJob, {DeleteJobState} from "./deleteJob";
import create, {CreateJobState} from "./create";
import showForm, {JobFormState} from "./showForm";
import update, {UpdateJobState} from "./update";
import search, {SearchJobState} from "./search";

export interface JobManagerModuleState {
  list: JobListState,
  search: SearchJobState,
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
  search,
});
