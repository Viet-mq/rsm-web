import * as Actions from "../actions";
import {ProfileFormAction} from "../actions";
import {DetailCV, DetailProfileEntity, ProcessForm, ProfileEntity, RecruitmentTalentPool} from "../../types";

export interface ProfileFormState {
  show_create?: boolean,
  show_update?: boolean,
  show_update_detail?: boolean,
  data_update_detail?: DetailProfileEntity | any,
  show_detail?: DetailCV,
  data_update?: ProfileEntity | any,
  id_detail?: string,
  show_upload_avatar?: boolean,
  id_upload_avatar?: string,
  show_reason_reject?: boolean
  show_change_process?: boolean,
  id_recruitment?: string,
  show_change_recruitment?: boolean,
  change_process?: ProcessForm
  show_add_to_talent_pool?: boolean,
  recruitment_talentpool?: RecruitmentTalentPool,
}

const initState: ProfileFormState = {
  show_create: false,
  show_update: false,
  show_reason_reject: false,
  show_update_detail: false,
  show_upload_avatar: false,
  show_change_process: false,
  show_change_recruitment: false,
  show_detail: {
    show_detail: false,
    general: 24,
    detail: 0,
  },
  show_add_to_talent_pool: false,

}

export default (state = initState, {
  type,
  show_create,
  show_update,
  show_detail,
  show_reason_reject,
  show_update_detail,
  data_update,
  id_detail,
  data_update_detail,
  show_upload_avatar,
  id_upload_avatar,
  show_change_process,
  id_recruitment,
  show_change_recruitment,
  change_process,
  show_add_to_talent_pool,
  recruitment_talentpool
}: ProfileFormAction): ProfileFormState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
        show_update_detail: false,
        show_upload_avatar: false,
        recruitment_talentpool
      }
    case Actions.REASON_REJECT_SHOW_FORM:
      return {
        ...state,
        show_reason_reject,
        show_create: false,
        show_update: false,
        show_change_process: false,
        show_update_detail: false,
        show_upload_avatar: false
      }

    case Actions.PROFILE_SHOW_FORM_UPDATE:
      return {
        ...state,
        show_update,
        data_update,
        show_create: false,
        show_update_detail: false,
        show_upload_avatar: false,
        show_change_process: false,

      }

    case Actions.PROFILE_SHOW_FORM_UPDATE_DETAIL:
      return {
        ...state,
        show_update_detail,
        data_update_detail,
        show_create: false,
        show_update: false,
        show_upload_avatar: false,
        show_change_process: false,

      }
    case Actions.PROFILE_SHOW_FORM_DETAIL:
      return {
        ...state,
        show_detail,
        id_detail,
        show_create: false,
        show_update: false,
        show_change_process: false,
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
        show_change_process: false,
        show_update_detail: false,
      }

    case Actions.SHOW_CHANGE_PROCESS_FORM:
      return {
        ...state,
        show_change_process,
        change_process,
        show_create: false,
        show_update: false,
        show_reason_reject: false,
        show_update_detail: false,
        show_upload_avatar: false,
        show_change_recruitment: false
      }
    case Actions.SHOW_CHANGE_RECRUITMENT_FORM:
      return {
        ...state,
        show_change_recruitment,
        id_recruitment,
        show_change_process: false,
        show_create: false,
        show_update: false,
        show_reason_reject: false,
        show_update_detail: false,
        show_upload_avatar: false
      }

    case Actions.SHOW_ADD_TO_TALENT_POOL_FORM:
      return {
        ...state,
        show_add_to_talent_pool,
        show_change_process: false,
        show_create: false,
        show_update: false,
        show_change_recruitment: false,
        show_reason_reject: false,
        show_update_detail: false,
        show_upload_avatar: false
      }
    default:
      return state;
  }
}



