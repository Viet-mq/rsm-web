import {ProfileEntity} from "../../../types";
import * as Actions from "../../actions";
import {UploadCVFormAction} from "../../actions";

export interface ShowUploadFormState {
  show_upload?: boolean,
  id_upload?: string
}

const initUploadState: ShowUploadFormState = {
  show_upload: false,
}

export default (state = initUploadState, {
  type,
  show_upload,
  id_upload,
}: UploadCVFormAction): ShowUploadFormState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_UPLOADCV:
      return {
        ...state,
        show_upload,
        id_upload,
      }
    default:
      return state;
  }
}
