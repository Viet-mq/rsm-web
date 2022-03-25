import {combineReducers} from "redux";
import list, {ReasonRejectListState} from "./list";
import deleteReasonReject, {DeleteReasonRejectState} from "./deleteReasonReject";
import create, {CreateReasonRejectState} from "./create";
import showForm, {ReasonRejectFormState} from "./showForm";
import update, {UpdateReasonRejectState} from "./update";
import search, {SearchListReasonRejectState} from "./search";

export interface ReasonRejectManagerModuleState {
  list: ReasonRejectListState,
  deleteReasonReject: DeleteReasonRejectState,
  create: CreateReasonRejectState,
  showForm: ReasonRejectFormState,
  update: UpdateReasonRejectState,
  search: SearchListReasonRejectState,
}

export default combineReducers<ReasonRejectManagerModuleState>({
  list,
  deleteReasonReject,
  create,
  showForm,
  update,
  search,
});
