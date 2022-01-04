import {combineReducers} from "redux";
import list, {TalentPoolListState} from "./list";
import deleteTalentPool, {DeleteTalentPoolState} from "./deleteTalentPool";
import create, {CreateTalentPoolState} from "./create";
import showForm, {TalentPoolFormState} from "./showForm";
import update, {UpdateTalentPoolState} from "./update";

export interface TalentPoolManagerModuleState {
  list: TalentPoolListState,
  deleteTalentPool: DeleteTalentPoolState,
  create: CreateTalentPoolState,
  showForm: TalentPoolFormState,
  update: UpdateTalentPoolState,
}

export default combineReducers<TalentPoolManagerModuleState>({
  list,
  deleteTalentPool,
  create,
  showForm,
  update,
});
