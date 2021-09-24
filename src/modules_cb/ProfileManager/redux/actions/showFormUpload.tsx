import {ProfileEntity, UploadCVRequest} from "../../types";


export interface UploadCVFormAction {
  type:string,
  show_upload?:boolean,
  data_upload?:ProfileEntity
}

export const PROFILE_SHOW_FORM_UPLOADCV = "PROFILE_SHOW_FORM_UPLOADCV";

export const showFormUploadCV = (show: boolean, dataUpload?: ProfileEntity): UploadCVFormAction => ({
  type: PROFILE_SHOW_FORM_UPLOADCV,
  show_upload: show,
  data_upload:dataUpload
});
