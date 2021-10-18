import {ProfileEntity} from "../../../types";


export interface UploadCVFormAction {
  type:string,
  show_upload?:boolean,
  id_upload?:string
}

export const PROFILE_SHOW_FORM_UPLOADCV = "PROFILE_SHOW_FORM_UPLOADCV";

export const showFormUploadCV = (show: boolean, id_upload?: string): UploadCVFormAction => ({
  type: PROFILE_SHOW_FORM_UPLOADCV,
  show_upload: show,
  id_upload:id_upload
});
