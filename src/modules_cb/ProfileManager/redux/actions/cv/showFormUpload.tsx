
export interface UploadCVFormAction {
  type:string,
  show_upload?:boolean,
  show_upload_list?:boolean,
  id_upload?:string
}

export const PROFILE_SHOW_FORM_UPLOADCV = "PROFILE_SHOW_FORM_UPLOADCV";
export const PROFILE_SHOW_FORM_UPLOAD_LIST_CV = "PROFILE_SHOW_FORM_UPLOAD_LIST_CV";

export const showFormUploadCV = (show: boolean, id_upload?: string): UploadCVFormAction => ({
  type: PROFILE_SHOW_FORM_UPLOADCV,
  show_upload: show,
  id_upload:id_upload
});

export const showFormUploadListCV = (show: boolean): UploadCVFormAction => ({
  type: PROFILE_SHOW_FORM_UPLOAD_LIST_CV,
  show_upload_list: show,
});
