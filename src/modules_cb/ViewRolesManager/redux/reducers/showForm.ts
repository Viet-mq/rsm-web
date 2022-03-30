import * as Actions from "../actions";
import {ShowViewRolesFormAction} from "../actions";
import {ViewRolesEntity} from "../../types";

export interface ShowViewRolesFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: ViewRolesEntity|any
}

const initState: ShowViewRolesFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: ShowViewRolesFormAction): ShowViewRolesFormState => {
  switch (type) {
    case Actions.SHOW_FORM_VIEW_ROLES_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.SHOW_FORM_VIEW_ROLES_UPDATE:
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
