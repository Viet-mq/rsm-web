import {combineReducers} from "redux";
import list, {ListEmailState} from "./list";
import deleteJob, {DeleteJobState} from "./deleteJob";
import create, {CreateEmailState} from "./create";
import update, {UpdateEmailState} from "./update";
import keyPoint, {KeyPointState} from "./keyPoint";
import search, {SearchEmailState} from "./search";

export interface EmailManagerModuleState {
  list: ListEmailState,
  deleteJob: DeleteJobState,
  create: CreateEmailState,
  update: UpdateEmailState,
  keyPoint:KeyPointState,
  search:SearchEmailState
}

export default combineReducers<EmailManagerModuleState>({
  list,
  deleteJob,
  create,
  update,
  keyPoint,
  search,
});
