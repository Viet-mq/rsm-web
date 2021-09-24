import {combineReducers} from "redux";
import list, {ProfileListState} from "./list";
import deleteProfile, {DeleteProfileState} from "./deleteProfile";
import create, {CreateProfileState} from "./create";
import showForm, {ProfileFormState} from "./showForm";
import update, {UpdateProfileState} from "./update";
import uploadCV,{UploadCVState} from "./uploadCV";
import showFormUpload,{ShowUploadFormState} from "./showFormUpload";

export interface ProfileManagerModuleState {
  list: ProfileListState,
  deleteProfile: DeleteProfileState,
  create: CreateProfileState,
  showForm: ProfileFormState,
  update: UpdateProfileState,
  uploadCV:UploadCVState,
  showFormUpload:ShowUploadFormState,

}

export default combineReducers<ProfileManagerModuleState>({
  list,
  deleteProfile,
  create,
  showForm,
  update,
  uploadCV,
  showFormUpload,
});
