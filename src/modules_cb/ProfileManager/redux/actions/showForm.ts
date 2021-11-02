import {DetailCV, DetailProfileEntity, ProfileEntity, UploadAvatarRequest} from "../../types";

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
  id_upload_avatar?:string

}

export const PROFILE_SHOW_FORM_CREATE = "PROFILE_SHOW_FORM_CREATE";
export const PROFILE_SHOW_FORM_UPDATE = "PROFILE_SHOW_FORM_UPDATE";
export const PROFILE_SHOW_FORM_UPDATE_DETAIL = "PROFILE_SHOW_FORM_UPDATE_DETAIL";
export const PROFILE_SHOW_FORM_DETAIL = "PROFILE_SHOW_FORM_DETAIL";
export const PROFILE_SHOW_FORM_UPLOAD_AVATAR = "PROFILE_SHOW_FORM_UPLOAD_AVATAR";

export const showFormCreate = (show: boolean): ProfileFormAction => ({
  type: PROFILE_SHOW_FORM_CREATE,
  show_create: show
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

export const showFormUploadAvatar = (show_upload_avatar: boolean,id_upload_avatar?:string): ProfileFormAction => ({
  type: PROFILE_SHOW_FORM_UPLOAD_AVATAR,
  show_upload_avatar: show_upload_avatar,
  id_upload_avatar:id_upload_avatar
});



