import * as Actions from "../actions";
import {SchoolFormAction} from "../actions";
import {SchoolEntity} from "../../types";

export interface SchoolFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: SchoolEntity|any
}

const initState: SchoolFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: SchoolFormAction): SchoolFormState => {
  switch (type) {
    case Actions.SCHOOL_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.SCHOOL_SHOW_FORM_UPDATE:
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
