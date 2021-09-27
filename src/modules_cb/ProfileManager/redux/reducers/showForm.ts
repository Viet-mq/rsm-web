import * as Actions from "../actions";
import {ProfileFormAction} from "../actions";
import {DetailCV, ProfileEntity} from "../../types";

export interface ProfileFormState {
  show_create?: boolean,
  show_update?: boolean,
  show_detail?: DetailCV,
  data_update?: ProfileEntity
}

const initState: ProfileFormState = {
  show_create: false,
  show_update: false,
  show_detail: {
    show_detail: false,
    general: 24,
    detail: 0,
  },
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  show_detail,
  data_update
}: ProfileFormAction): ProfileFormState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
        show_detail: {
          show_detail: false,
          general: 24,
          detail: 0,
        },
      }
    case Actions.PROFILE_SHOW_FORM_UPDATE:
      return {
        ...state,
        show_update,
        data_update,
        show_create: false,
        show_detail: {
          show_detail: false,
          general: 24,
          detail: 0,
        },
      }
    case Actions.PROFILE_SHOW_FORM_DETAIL:
      return {
        ...state,
        show_detail,
        data_update,
        show_create: false,
        show_update: false,
      }
    default:
      return state;
  }
}



