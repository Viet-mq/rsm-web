import {combineReducers} from "redux";
import show_form, {ScriptShowFormState} from "./show_form";
import create, {CreateScriptState} from "./create";
import list, {GetListScriptState} from "./list";
import update, {UpdateScriptState} from "./update";
import delete_script, {DeleteScriptState} from "./delete_script";
import add_step, {AddStepScriptState} from "./add_step";
import remove_step, {RemoveStepScriptState} from "./remove_step";
import update_step, {UpdateStepScriptState} from "./update_step";

export interface ScriptManagerModuleState {
  show_form: ScriptShowFormState,
  create: CreateScriptState,
  update: UpdateScriptState,
  list: GetListScriptState,
  delete_script: DeleteScriptState,
  add_step: AddStepScriptState,
  remove_step: RemoveStepScriptState,
  update_step: UpdateStepScriptState,
}

export default combineReducers<ScriptManagerModuleState>({
  show_form,
  create,
  update,
  list,
  delete_script,
  add_step,
  remove_step,
  update_step,
});
