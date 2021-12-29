import {AppError} from "src/models/common";
import * as Actions from "../actions";
import {ProfileEntity} from "../../../ProfileManager/types";
import {ListKanbanCandidateAction} from "../actions";

export interface ListKanbanCandidateState {
  loading: boolean,
  params?: any,
  rows?: ProfileEntity[],
  total?: number,
  error?: AppError,

}

const initState: ListKanbanCandidateState = {
  loading: false,
  params: {},
  rows: [],
  total: 0,

}

export default (state = initState, {type, total, rows, params, error}: ListKanbanCandidateAction): ListKanbanCandidateState => {
  switch (type) {
    case Actions.GET_LIST_KANBAN_CANDIDATE:
      return {
        ...state,
        params,
        loading: true
      }
    case Actions.GET_LIST_KANBAN_CANDIDATE_SUCCESS:
      return {
        ...state,
        total,
        rows,
        loading: false,
      }
    case Actions.GET_LIST_KANBAN_CANDIDATE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
