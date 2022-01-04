import * as Actions from "../actions";
import {SkillFormAction} from "../actions";
import {SkillEntity} from "../../types";

export interface SkillFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: SkillEntity|any
}

const initState: SkillFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: SkillFormAction): SkillFormState => {
  switch (type) {
    case Actions.SKILL_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.SKILL_SHOW_FORM_UPDATE:
      return {
        ...state,
        show_update,
        data_update,
        show_create: false,
      }

    default:
      return state;
  }
}
