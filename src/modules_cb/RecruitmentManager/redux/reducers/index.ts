import {combineReducers} from "redux";
import list, {RecruitmentListState} from "./list";
import deleteJob, {DeleteJobState} from "./deleteJob";
import create, {CreateJobState} from "./create";
import showForm, {JobFormState} from "./showForm";
import update, {UpdateJobState} from "./update";

export interface RecruitmentManagerModuleState {
  list: RecruitmentListState,
  deleteJob: DeleteJobState,
  create: CreateJobState,
  showForm: JobFormState,
  update: UpdateJobState,
}

export default combineReducers<RecruitmentManagerModuleState>({
  list,
  deleteJob,
  create,
  showForm,
  update,
});
