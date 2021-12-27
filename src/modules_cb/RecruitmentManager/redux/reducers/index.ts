import {combineReducers} from "redux";
import list, {RecruitmentListState} from "./list";
import deleteRecruitment, {DeleteRecruitmentState} from "./deleteRecruitment";
import create, {CreateRecruitmentState} from "./create";
// import showForm, {RecruitmentFormState} from "./showForm";
import update, {UpdateRecruitmentState} from "./update";
import detailRecruitment,{ DetailRecruitmentState } from "./detail";

export interface RecruitmentManagerModuleState {
  list: RecruitmentListState,
  deleteRecruitment: DeleteRecruitmentState,
  create: CreateRecruitmentState,
  detailRecruitment:DetailRecruitmentState,
  update: UpdateRecruitmentState,
}

export default combineReducers<RecruitmentManagerModuleState>({
  list,
  deleteRecruitment,
  create,
  detailRecruitment,
  update,
});
