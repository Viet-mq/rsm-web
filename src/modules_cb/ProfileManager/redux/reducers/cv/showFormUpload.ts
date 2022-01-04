import * as Actions from "../../actions";
import {UploadCVFormAction} from "../../actions";

export interface ShowUploadFormState {
  show_upload?: boolean,
  id_upload?: string,
  show_upload_list?: boolean,

}

const initUploadState: ShowUploadFormState = {
  show_upload: false,
  show_upload_list: false,

}

export default (state = initUploadState, {
  type,
  show_upload,
  show_upload_list,
  id_upload,
}: UploadCVFormAction): ShowUploadFormState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_UPLOADCV:
      return {
        ...state,
        show_upload,
        id_upload,
        show_upload_list: false
      }

    case Actions.PROFILE_SHOW_FORM_UPLOAD_LIST_CV:
      return {
        ...state,
        show_upload_list,
        show_upload: false
      }
    default:
      return state;
  }
}
