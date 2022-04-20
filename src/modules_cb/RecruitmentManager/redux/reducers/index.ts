import {combineReducers} from "redux";
import list, {RecruitmentListState} from "./list";
import deleteRecruitment, {DeleteRecruitmentState} from "./deleteRecruitment";
import create, {CreateRecruitmentState} from "./create";
import update, {UpdateRecruitmentState} from "./update";
import detailRecruitment, {DetailRecruitmentState} from "./detail";
import listKanbanCandidate, {ListKanbanCandidateState} from "./listKanbanCandidate";
import searchUser, {SearchUserState} from "./searchUser";
import createSteps, {CreateStepsState} from "./createSteps";
import showForm, {ProcessFormState} from "./showForm";
import createInterviewProcess, {CreateInterviewProcessState} from "./createInterviewProcess";
import deleteProcess, {DeleteProcessState} from "./deleteProcess";

export interface RecruitmentManagerModuleState {
  list: RecruitmentListState,
  deleteRecruitment: DeleteRecruitmentState,
  deleteProcess: DeleteProcessState,
  create: CreateRecruitmentState,
  detailRecruitment: DetailRecruitmentState,
  update: UpdateRecruitmentState,
  listKanbanCandidate: ListKanbanCandidateState,
  createSteps: CreateStepsState,
  showForm: ProcessFormState,
  createInterviewProcess: CreateInterviewProcessState,
  searchUser: SearchUserState
}

export default combineReducers<RecruitmentManagerModuleState>({
  list,
  deleteRecruitment,
  create,
  detailRecruitment,
  update,
  listKanbanCandidate,
  createSteps,
  showForm,
  createInterviewProcess,
  searchUser,
  deleteProcess,
});
