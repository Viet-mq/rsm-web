import {combineReducers} from "redux";
import list, {ProfileListState} from "./list";
import deleteProfile, {DeleteProfileState} from "./deleteProfile";
import create, {CreateProfileState} from "./create";
import showForm, {ProfileFormState} from "./showForm";
import update, {UpdateProfileState} from "./update";

export interface ProfileManagerModuleState {
  list: ProfileListState,
  deleteProfile: DeleteProfileState,
  create: CreateProfileState,
  showForm: ProfileFormState,
  update: UpdateProfileState,
}

export default combineReducers<ProfileManagerModuleState>({
  list,
  deleteProfile,
  create,
  showForm,
  update,
});
