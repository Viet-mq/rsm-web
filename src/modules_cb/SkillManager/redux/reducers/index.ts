import {combineReducers} from "redux";
import list, {SkillListState} from "./list";
import deleteSkill, {DeleteSkillState} from "./deleteSkill";
import create, {CreateSkillState} from "./create";
import showForm, {SkillFormState} from "./showForm";
import update, {UpdateSkillState} from "./update";

export interface SkillManagerModuleState {
  list: SkillListState,
  deleteSkill: DeleteSkillState,
  create: CreateSkillState,
  showForm: SkillFormState,
  update: UpdateSkillState,
}

export default combineReducers<SkillManagerModuleState>({
  list,
  deleteSkill,
  create,
  showForm,
  update,
});
