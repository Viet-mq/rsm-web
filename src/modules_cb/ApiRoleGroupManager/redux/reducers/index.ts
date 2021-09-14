import {combineReducers} from "redux";
import list, {GetListApiGroupState} from "./list";
import create, {CreateApiGroupState} from "./create";
import update, {UpdateApiGroupState} from "./update";
import deleteGroup, {DeleteApiGroupState} from "./deleteGroup";
import assign, {AssignApiRoleState} from "./assign";
import revoke, {RevokeApiRoleState} from "./revoke";
import showForm, {ShowFormGroupApiState} from "./showForm";

export interface ApiRoleGroupModuleState {
  list: GetListApiGroupState,
  create: CreateApiGroupState,
  update: UpdateApiGroupState,
  deleteGroup: DeleteApiGroupState,
  assign: AssignApiRoleState,
  revoke: RevokeApiRoleState,
  showForm: ShowFormGroupApiState,
}

export default combineReducers<ApiRoleGroupModuleState>({
  list,
  create,
  update,
  deleteGroup,
  assign,
  revoke,
  showForm
});
