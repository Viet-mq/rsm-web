export interface Step {
  step_id: string,
  step_name: string,
}

export interface ScriptEntity {
  scenario_id: string,
  scenario_name: string,
  chatbot_id: string,
  list_step: Step[]
}


export interface CreateScriptRequest {
  chatbot_id: string,
  scenario_name: string
}

export interface UpdateScriptRequest {
  bot_id: string,
  name: string
}

export interface DeleteScriptRequest {
  scenario_id: string,
}

export interface AddStepScriptRequest {
  bot_id: string,
  name: string
}

export interface UpdateStepScriptRequest {
  bot_id: string,
  name: string
}

export interface RemoveStepScriptRequest {
  bot_id: string,
  name: string
}
