import {combineReducers} from "redux";
import list, {ListEmailState} from "./list";
import deleteJob, {DeleteJobState} from "./deleteJob";
import create, {CreateEmailState} from "./create";
import update, {UpdateEmailState} from "./update";

export interface EmailManagerModuleState {
  list: ListEmailState,
  deleteJob: DeleteJobState,
  create: CreateEmailState,
  update: UpdateEmailState,
}

export default combineReducers<EmailManagerModuleState>({
  list,
  deleteJob,
  create,
  update,
});
