import * as Actions from "../actions";
import {ProfileFormAction} from "../actions";
import {ProfileEntity} from "../../types";

export interface ProfileFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: ProfileEntity
}

const initState: ProfileFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: ProfileFormAction): ProfileFormState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.PROFILE_SHOW_FORM_UPDATE:
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



