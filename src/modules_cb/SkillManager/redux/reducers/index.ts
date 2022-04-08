import {combineReducers} from "redux";
import list, {SkillListState} from "./list";
import deleteSkill, {DeleteSkillState} from "./deleteSkill";
import create, {CreateSkillState} from "./create";
import showForm, {SkillFormState} from "./showForm";
import update, {UpdateSkillState} from "./update";
import search, {SearchSkillState} from "./search";

export interface SkillManagerModuleState {
  list: SkillListState,
  search: SearchSkillState,
  deleteSkill: DeleteSkillState,
  create: CreateSkillState,
  showForm: SkillFormState,
  update: UpdateSkillState,
}

export default combineReducers<SkillManagerModuleState>({
  list,
  search,
  deleteSkill,
  create,
  showForm,
  update,
});
