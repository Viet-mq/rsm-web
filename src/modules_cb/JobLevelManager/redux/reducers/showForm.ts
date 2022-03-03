import * as Actions from "../actions";
import {JobLevelFormAction} from "../actions";
import {JobLevelEntity} from "../../types";

export interface JobLevelFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: JobLevelEntity|any
}

const initState: JobLevelFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: JobLevelFormAction): JobLevelFormState => {
  switch (type) {
    case Actions.JOB_LEVEL_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.JOB_LEVEL_SHOW_FORM_UPDATE:
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
