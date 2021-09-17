import * as Actions from "../actions";
import {JobFormAction} from "../actions";
import {JobEntity} from "../../types";

export interface JobFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: JobEntity
}

const initState: JobFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: JobFormAction): JobFormState => {
  switch (type) {
    case Actions.JOB_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.JOB_SHOW_FORM_UPDATE:
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
