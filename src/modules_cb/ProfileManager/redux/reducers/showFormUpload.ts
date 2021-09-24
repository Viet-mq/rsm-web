import {ProfileEntity, UploadCVRequest} from "../../types";
import * as Actions from "../actions";
import {UploadCVFormAction} from "../actions";

export interface ShowUploadFormState {
  show_upload?: boolean,
  data_upload?: ProfileEntity
}

const initUploadState: ShowUploadFormState = {
  show_upload: false,
}

export default (state = initUploadState, {
  type,
  show_upload,
  data_upload,
}: UploadCVFormAction): ShowUploadFormState => {
  switch (type) {
    case Actions.PROFILE_SHOW_FORM_UPLOADCV:
      return {
        ...state,
        show_upload,
        data_upload,
      }
    default:
      return state;
  }
}
