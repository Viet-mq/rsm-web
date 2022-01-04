import {combineReducers} from "redux";
import list, {GetListGroupAPIState} from "./group_api/list";
import create, {CreateGroupAPIState} from "./group_api/create";
import deleteGroupAPI, {DeleteGroupAPIState} from "./group_api/deleteGroupAPI";
import update, {UpdateGroupAPIState} from "./group_api/update";
import showForm, {ShowGroupAPIState} from "./showForm";
import add_api, {AddAPIState} from "./api/add_api";
import remove_api, {RemoveAPIState} from "./api/remove_api";
import assign_user,{AssignUserState} from "./user/assign_user";
import revoke_user,{RevokeUserState} from "./user/revoke_user";

export interface GroupAPIModuleState {
  list: GetListGroupAPIState,
  create: CreateGroupAPIState,
  update: UpdateGroupAPIState,
  showForm: ShowGroupAPIState,
  add_api: AddAPIState,
  remove_api: RemoveAPIState,
  deleteGroupAPI: DeleteGroupAPIState,
  assign_user:AssignUserState,
  revoke_user:RevokeUserState
}

export default combineReducers<GroupAPIModuleState>({
  list,
  create,
  update,
  showForm,
  add_api,
  remove_api,
  deleteGroupAPI,
  assign_user,
  revoke_user
});
