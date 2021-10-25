import {NoteEntity} from "../../../types";
import {AppError} from "../../../../../models/baseResponse";
import * as Actions from "../../actions";
import {GetListNoteAction} from "../../actions";


export interface GetListNoteState {
  loading: boolean,
  params?: any,
  result?: NoteEntity|any,
  error?: AppError
}

const initState: GetListNoteState = {
  loading: false,
  params: {},
}

export default (state = initState, {
  type,
  params,
  error,
  result
}: GetListNoteAction): GetListNoteState => {
  switch (type) {
    case Actions.GET_LIST_NOTE:
      return {
        ...state,
        params,
        loading: false,
      }
    case Actions.GET_LIST_NOTE_SUCCESS:
      return {
        ...state,
        result,
        loading: false
      }
    case Actions.GET_LIST_NOTE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }

}
