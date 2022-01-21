import {ChangeProcessRequest, DetailCV, DetailProfileEntity, ProcessForm, ProfileEntity} from "../../types";

export interface ProfileFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  show_update_detail?: boolean,
  show_detail?: DetailCV,
  data_update?: ProfileEntity
  data_update_detail?: DetailProfileEntity
  id_detail?: string,
  show_upload_avatar?: boolean,
  id_upload_avatar?: string,
  show_reason_reject?:boolean,
  show_change_process?:boolean,
  id_recruitment?:string,
  show_change_recruitment?:boolean,
  change_process?:ProcessForm
  show_add_to_talent_pool?:boolean,

}

export const PROFILE_SHOW_FORM_CREATE = "PROFILE_SHOW_FORM_CREATE";
export const PROFILE_SHOW_FORM_UPDATE = "PROFILE_SHOW_FORM_UPDATE";
export const PROFILE_SHOW_FORM_UPDATE_DETAIL = "PROFILE_SHOW_FORM_UPDATE_DETAIL";
export const PROFILE_SHOW_FORM_DETAIL = "PROFILE_SHOW_FORM_DETAIL";
export const PROFILE_SHOW_FORM_UPLOAD_AVATAR = "PROFILE_SHOW_FORM_UPLOAD_AVATAR";
export const REASON_REJECT_SHOW_FORM = "REASON_REJECT_SHOW_FORM";
export const SHOW_CHANGE_PROCESS_FORM = "SHOW_CHANGE_PROCESS_FORM";
export const SHOW_CHANGE_RECRUITMENT_FORM = "SHOW_CHANGE_RECRUITMENT_FORM";
export const SHOW_ADD_TO_TALENT_POOL_FORM = "SHOW_ADD_TO_TALENT_POOL_FORM";

export const showFormCreate = (show: boolean): ProfileFormAction => ({
  type: PROFILE_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormReasonReject = (show: boolean): ProfileFormAction => ({
  type: REASON_REJECT_SHOW_FORM,
  show_reason_reject: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: ProfileEntity): ProfileFormAction => ({
  type: PROFILE_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

export const showFormUpdateDetail = (show: boolean, dataUpdateDetail?: DetailProfileEntity): ProfileFormAction => ({
  type: PROFILE_SHOW_FORM_UPDATE_DETAIL,
  show_update_detail: show,
  data_update_detail: dataUpdateDetail
});

export const showFormDetail = (show?: DetailCV, id_detail?: string): ProfileFormAction => ({
  type: PROFILE_SHOW_FORM_DETAIL,
  show_detail: show,
  id_detail: id_detail
});

export const showFormUploadAvatar = (show_upload_avatar: boolean, id_upload_avatar?: string): ProfileFormAction => ({
  type: PROFILE_SHOW_FORM_UPLOAD_AVATAR,
  show_upload_avatar: show_upload_avatar,
  id_upload_avatar: id_upload_avatar
});


export const showChangeProcessForm = (show: boolean,changeProcess?:ProcessForm): ProfileFormAction => ({
  type: SHOW_CHANGE_PROCESS_FORM,
  show_change_process: show,
  change_process:changeProcess
});

export const showChangeRecruitmentForm = (show: boolean,idRecruitment?:string): ProfileFormAction => ({
  type: SHOW_CHANGE_RECRUITMENT_FORM,
  show_change_recruitment: show,
  id_recruitment:idRecruitment
});

export const showAddToTalentPoolForm = (show: boolean): ProfileFormAction => ({
  type: SHOW_ADD_TO_TALENT_POOL_FORM,
  show_add_to_talent_pool: show,
});




