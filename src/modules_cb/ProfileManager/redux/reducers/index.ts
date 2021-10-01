import {combineReducers} from "redux";
import list, {ProfileListState} from "./profile/list";
import deleteProfile, {DeleteProfileState} from "./profile/deleteProfile";
import create, {CreateProfileState} from "./profile/create";
import showForm, {ProfileFormState} from "./showForm";
import update, {UpdateProfileState} from "./profile/update";
import detail, {DetailProfileState} from "./detail/detail";
import uploadCV, {UploadCVState} from "./cv/uploadCV";
import showFormUpload, {ShowUploadFormState} from "./cv/showFormUpload";
import showBooking, {BookingState} from "./booking/showBooking";
import getBooking, {GetBookingState} from "./booking/getBooking";
import createBooking, {CreateBookingState} from "./booking/createBooking";
import updateBooking, {UpdateBookingState} from "./booking/updateBooking";

export interface ProfileManagerModuleState {
  list: ProfileListState,
  deleteProfile: DeleteProfileState,
  create: CreateProfileState,
  showForm: ProfileFormState,
  update: UpdateProfileState,
  detail: DetailProfileState,
  uploadCV: UploadCVState,
  showFormUpload: ShowUploadFormState,
  showBooking: BookingState,
  getBooking: GetBookingState,
  createBooking: CreateBookingState,
  updateBooking: UpdateBookingState
}

export default combineReducers<ProfileManagerModuleState>({
  list,
  deleteProfile,
  create,
  showForm,
  update,
  detail,
  uploadCV,
  showFormUpload,
  showBooking,
  updateBooking,
  getBooking,
  createBooking,
});
