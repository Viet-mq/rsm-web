import {ApiRoleGroupEntity} from "../../types";
import * as Actions from "../actions";
import {ShowFormGroupApiAction} from "../actions";

export interface ShowFormGroupApiState {
  show_create?: boolean,
  show_update?: boolean,
  show_assign?: boolean,
  show_revoke?: boolean,
  entity?: ApiRoleGroupEntity
}

const initState: ShowFormGroupApiState = {
  show_create: false,
  show_update: false,
  show_assign: false,
  show_revoke: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  show_assign,
  show_revoke,
  entity
}: ShowFormGroupApiAction): ShowFormGroupApiState => {
  switch (type) {
    case Actions.SHOW_API_GROUP_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
        show_assign: false,
        show_revoke: false,
      }
    case Actions.SHOW_API_GROUP_FORM_UPDATE:
      return {
        ...state,
        show_update,
        entity,
        show_create: false,
        show_assign: false,
        show_revoke: false,
      }
    default:
      return state;
  }
}
