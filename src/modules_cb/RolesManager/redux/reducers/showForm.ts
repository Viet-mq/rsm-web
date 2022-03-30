import * as Actions from "../actions";
import {ShowRolesFormAction} from "../actions";
import {RolesEntity} from "../../types";

export interface ShowRolesFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: RolesEntity|any,
  show_add_api_roles?:boolean,
  show_add_view_roles?:boolean,
}

const initState: ShowRolesFormState = {
  show_create: false,
  show_update: false,
  show_add_api_roles:false,
  show_add_view_roles:false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update,
  show_add_api_roles,
  show_add_view_roles
}: ShowRolesFormAction): ShowRolesFormState => {
  switch (type) {
    case Actions.SHOW_FORM_ROLES_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
        show_add_api_roles: false,
        show_add_view_roles: false,
      }

      case Actions.SHOW_FORM_ADD_API_ROLES:
      return {
        ...state,
        show_add_api_roles,

        show_add_view_roles: false,
      }

      case Actions.SHOW_FORM_ADD_VIEW_ROLES:
      return {
        ...state,
        show_add_view_roles,

        show_add_api_roles: false,
      }
    case Actions.SHOW_FORM_ROLES_UPDATE:
      return {
        ...state,
        show_update,
        data_update,
        show_create: false,
        show_add_api_roles: false,
        show_add_view_roles: false,
      }

    default:
      return state;
  }
}
