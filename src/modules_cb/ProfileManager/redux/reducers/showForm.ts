import * as Actions from "../actions";
import {ProfileFormAction} from "../actions";
import {DetailCV, DetailProfileEntity, ProfileEntity} from "../../types";

export interface ProfileFormState {
  show_create?: boolean,
  show_update?: boolean,
  show_update_detail?: boolean,
  data_update_detail?: DetailProfileEntity | any,
  show_detail?: DetailCV,
  data_update?: ProfileEntity | any,
  id_detail?: string,
  show_upload_avatar?: boolean,
  id_upload_avatar?: string
}

const initState: ProfileFormState = {
  show_create: false,
  show_update: false,
  show_update_detail: false,
  show_upload_avatar: false,
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
  show_update_detail,
  data_update,
  id_detail,
  data_update_detail,
  show_upload_avatar,
  id_upload_avatar
}: ProfileFormAction): ProfileFormState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
        show_update_detail: false,
        // show_detail: {
        //   show_detail: false,
        //   general: 24,
        //   detail: 0,
        // },
        show_upload_avatar: false
      }
    case Actions.PROFILE_SHOW_FORM_UPDATE:
      return {
        ...state,
        show_update,
        data_update,
        show_create: false,
        show_update_detail: false,
        // show_detail: {
        //   show_detail: false,
        //   general: 24,
        //   detail: 0,
        // },
        show_upload_avatar: false
      }

    case Actions.PROFILE_SHOW_FORM_UPDATE_DETAIL:
      return {
        ...state,
        show_update_detail,
        data_update_detail,
        show_create: false,
        show_update: false,
        // show_detail: {
        //   show_detail: false,
        //   general: 12,
        //   detail: 12,
        // },
        show_upload_avatar: false

      }
    case Actions.PROFILE_SHOW_FORM_DETAIL:
      return {
        ...state,
        show_detail,
        id_detail,
        show_create: false,
        show_update: false,
        show_update_detail: false,
        show_upload_avatar: false
      }
    case Actions.PROFILE_SHOW_FORM_UPLOAD_AVATAR:
      return {
        ...state,
        show_upload_avatar,
        id_upload_avatar,
        show_update: false,
        show_create: false,
        show_update_detail: false,
        // show_detail: {
        //   show_detail: false,
        //   general: 24,
        //   detail: 0,
        // },
      }
    default:
      return state;
  }
}



