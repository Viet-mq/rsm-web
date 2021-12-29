import {combineReducers} from "redux";
import list, {RecruitmentListState} from "./list";
import deleteRecruitment, {DeleteRecruitmentState} from "./deleteRecruitment";
import create, {CreateRecruitmentState} from "./create";
import update, {UpdateRecruitmentState} from "./update";
import detailRecruitment,{ DetailRecruitmentState } from "./detail";
import listKanbanCandidate, { ListKanbanCandidateState } from "./listKanbanCandidate";

export interface RecruitmentManagerModuleState {
  list: RecruitmentListState,
  deleteRecruitment: DeleteRecruitmentState,
  create: CreateRecruitmentState,
  detailRecruitment:DetailRecruitmentState,
  update: UpdateRecruitmentState,
  listKanbanCandidate:ListKanbanCandidateState,
}

export default combineReducers<RecruitmentManagerModuleState>({
  list,
  deleteRecruitment,
  create,
  detailRecruitment,
  update,
  listKanbanCandidate,
});
