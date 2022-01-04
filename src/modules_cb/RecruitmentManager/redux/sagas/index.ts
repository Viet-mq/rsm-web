import {all, takeLatest} from 'redux-saga/effects';
import {createRecruitmentAsync} from "./create";
import {deleteRecruitmentAsync} from "./deleteRecruitment";
import {getListRecruitmentAsync} from "./list";
import {updateRecruitmentAsync} from "./update";
import {
  CREATE_INTERVIEW_PROCESS,
  CREATE_RECRUITMENT,
  DELETE_RECRUITMENT,
  GET_DETAIL_RECRUITMENT,
  GET_LIST_KANBAN_CANDIDATE,
  GET_LIST_RECRUITMENT,
  SEARCH_USER,
  UPDATE_RECRUITMENT
} from "../actions";
import {getDetailRecruitmentAsync} from "./detail";
import {getListKanbanCandidateAsync} from "./listKanbanCandidate";
import {searchUserAsync} from "./searchUser";
import {createInterviewProcessAsync} from "./createInterviewProcess";

export default function* root() {
  return all([
    yield takeLatest(CREATE_RECRUITMENT, createRecruitmentAsync),
    yield takeLatest(DELETE_RECRUITMENT, deleteRecruitmentAsync),
    yield takeLatest(GET_LIST_RECRUITMENT, getListRecruitmentAsync),
    yield takeLatest(GET_DETAIL_RECRUITMENT, getDetailRecruitmentAsync),
    yield takeLatest(UPDATE_RECRUITMENT, updateRecruitmentAsync),
    yield takeLatest(GET_LIST_KANBAN_CANDIDATE, getListKanbanCandidateAsync),
    yield takeLatest(CREATE_INTERVIEW_PROCESS, createInterviewProcessAsync),
    yield takeLatest(SEARCH_USER, searchUserAsync),
  ]);
}
