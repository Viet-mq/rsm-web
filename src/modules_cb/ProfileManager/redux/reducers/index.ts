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
import getActivity, {ActivityLogsState} from "./detail/getActivityLogs";
import getEmailLogs, {EmailLogsState} from "./detail/getEmailLogs";
import search, {GetElasticSearchState} from "./profile/search";
import uploadListCV, {UploadListCVState} from "./cv/uploadListCV";
import createNote, {CreateNoteState} from "./note/createNote";
import deleteNote, {DeleteNoteState} from "./note/deleteNote";
import getListNote, {GetListNoteState} from "./note/getListNote";
import showNote, {ShowNoteState} from "./note/showNote";
import updateNote, {UpdateNoteState} from "./note/updateNote";
import createComment, {CreateCommentState} from "./comment/createComment";
import deleteComment, {DeleteCommentState} from "./comment/deleteComment";
import getListComment, {GetListCommentState} from "./comment/getListComment";
import showComment, {ShowCommentState} from "./comment/showComment";
import updateComment, {UpdateCommentState} from "./comment/updateComment";
import uploadAvatar, {UploadAvatarState} from "./profile/uploadAvatar";
import createRejectCandidate, {CreateRejectCandidateState} from "./profile/createRejectCandidate";
import changeProcess, {ChangeProcessState} from "./profile/changeProcess";
import addToTalentPool, {AddToTalentPoolState} from "./profile/addToTalentPool";
import deleteCV, {DeleteCVState} from "./cv/deleteCV";
import addToBlacklist, {AddToBlacklistState} from "./profile/addToBlacklist";

export interface ProfileManagerModuleState {
  list: ProfileListState,
  deleteProfile: DeleteProfileState,
  create: CreateProfileState,
  createRejectCandidate: CreateRejectCandidateState,
  showForm: ProfileFormState,
  update: UpdateProfileState,
  updateDetail: UpdateDetailState,
  detail: DetailProfileState,
  uploadCV: UploadCVState,
  deleteCV: DeleteCVState,
  uploadListCV: UploadListCVState,
  showFormUpload: ShowUploadFormState,
  showBooking: BookingState,
  getBooking: GetBookingState,
  createBooking: CreateBookingState,
  updateBooking: UpdateBookingState,
  getActivity: ActivityLogsState,
  getEmailLogs: EmailLogsState,
  search: GetElasticSearchState,
  createNote: CreateNoteState,
  deleteNote: DeleteNoteState,
  getListNote: GetListNoteState,
  showNote: ShowNoteState,
  updateNote: UpdateNoteState,
  createComment: CreateCommentState,
  deleteComment: DeleteCommentState,
  getListComment: GetListCommentState,
  showComment: ShowCommentState,
  updateComment: UpdateCommentState,
  uploadAvatar: UploadAvatarState,
  changeProcess: ChangeProcessState,
  addToTalentPool: AddToTalentPoolState,
  addToBlacklist: AddToBlacklistState,
}

export default combineReducers<ProfileManagerModuleState>({
  list,
  deleteProfile,
  create,
  createRejectCandidate,
  showForm,
  update,
  updateDetail,
  detail,
  uploadCV,
  deleteCV,
  uploadListCV,
  showFormUpload,
  showBooking,
  updateBooking,
  getBooking,
  createBooking,
  getActivity,
  getEmailLogs,
  search,
  createNote,
  deleteNote,
  getListNote,
  showNote,
  updateNote,
  createComment,
  deleteComment,
  getListComment,
  showComment,
  updateComment,
  uploadAvatar,
  changeProcess,
  addToTalentPool,
  addToBlacklist,
});
