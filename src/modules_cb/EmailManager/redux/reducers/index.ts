import {combineReducers} from "redux";
import list, {ListEmailState} from "./list";
import deleteEmail, {DeleteEmailState} from "./deleteEmail";
import create, {CreateEmailState} from "./create";
import update, {UpdateEmailState} from "./update";
import keyPoint, {KeyPointState} from "./keyPoint";
import search, {SearchEmailState} from "./search";

export interface EmailManagerModuleState {
  list: ListEmailState,
  deleteEmail: DeleteEmailState,
  create: CreateEmailState,
  update: UpdateEmailState,
  keyPoint:KeyPointState,
  search:SearchEmailState
}

export default combineReducers<EmailManagerModuleState>({
  list,
  deleteEmail,
  create,
  update,
  keyPoint,
  search,
});
