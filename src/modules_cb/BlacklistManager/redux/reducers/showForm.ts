import * as Actions from "../actions";
import {BlacklistFormAction} from "../actions";
import {BlacklistEntity} from "../../types";

export interface BlacklistFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: BlacklistEntity|any
}

const initState: BlacklistFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: BlacklistFormAction): BlacklistFormState => {
  switch (type) {
    case Actions.BLACKLIST_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.BLACKLIST_SHOW_FORM_UPDATE:
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
