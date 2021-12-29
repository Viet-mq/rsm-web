import {AppError} from "src/models/common";
import {ProfileEntity} from "../../../ProfileManager/types";

export interface ListKanbanCandidateAction {
  type: string,
  params?: any,
  rows?: ProfileEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_KANBAN_CANDIDATE = "GET_LIST_KANBAN_CANDIDATE";
export const GET_LIST_KANBAN_CANDIDATE_SUCCESS = "GET_LIST_KANBAN_CANDIDATE_SUCCESS";
export const GET_LIST_KANBAN_CANDIDATE_ERROR = "GET_LIST_KANBAN_CANDIDATE_ERROR";

export const getListKanbanCandidate = (params: any): ListKanbanCandidateAction => ({
  type: GET_LIST_KANBAN_CANDIDATE,
  params
});

export const getListKanbanCandidateSuccess = (total: number, rows: ProfileEntity[]): ListKanbanCandidateAction => ({
  type: GET_LIST_KANBAN_CANDIDATE_SUCCESS,
  total,
  rows
});

export const getListKanbanCandidateError = (error: AppError): ListKanbanCandidateAction => ({
  type: GET_LIST_KANBAN_CANDIDATE_ERROR,
  error
});
