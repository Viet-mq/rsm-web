import {combineReducers} from "redux";
import list, {ProfileListState} from "./profile/list";
import deleteProfile, {DeleteProfileState} from "./profile/deleteProfile";
import create, {CreateProfileState} from "./profile/create";
import showForm, {ProfileFormState} from "./showForm";
import update, {UpdateProfileState} from "./profile/update";
import updateDetail, {UpdateDetailState} from "./detail/updateDetail";
import detail, {DetailProfileState} from "./detail/detail";
import uploadCV, {UploadCVState} from "./cv/uploadCV";
import showFormUpload, {ShowUploadFormState} from "./cv/showFormUpload";
import showBooking, {BookingState} from "./booking/showBooking";
import getBooking, {GetBookingState} from "./booking/getBooking";
import createBooking, {CreateBookingState} from "./booking/createBooking";
import updateBooking, {UpdateBookingState} from "./booking/updateBooking";
import getActivity,{ActivityLogsState} from "./detail/getActivityLogs";
import search,{GetElasticSearchState} from "./profile/search";

export interface ProfileManagerModuleState {
  list: ProfileListState,
  deleteProfile: DeleteProfileState,
  create: CreateProfileState,
  showForm: ProfileFormState,
  update: UpdateProfileState,
  updateDetail: UpdateDetailState,
  detail: DetailProfileState,
  uploadCV: UploadCVState,
  showFormUpload: ShowUploadFormState,
  showBooking: BookingState,
  getBooking: GetBookingState,
  createBooking: CreateBookingState,
  updateBooking: UpdateBookingState,
  getActivity:ActivityLogsState,
  search:GetElasticSearchState,
}

export default combineReducers<ProfileManagerModuleState>({
  list,
  deleteProfile,
  create,
  showForm,
  update,
  updateDetail,
  detail,
  uploadCV,
  showFormUpload,
  showBooking,
  updateBooking,
  getBooking,
  createBooking,
  getActivity,
  search
});
