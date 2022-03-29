import * as Actions from "../actions";
import {ShowAPIRolesFormAction} from "../actions";
import {APIRolesEntity} from "../../types";

export interface ShowAPIRolesFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: APIRolesEntity|any
}

const initState: ShowAPIRolesFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: ShowAPIRolesFormAction): ShowAPIRolesFormState => {
  switch (type) {
    case Actions.SHOW_FORM_API_ROLES_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.SHOW_FORM_API_ROLES_UPDATE:
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
