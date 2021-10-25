import {CreateNoteRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {CreateNoteAction} from "../../actions";

export interface CreateNoteState {
  loading: boolean,
  request?: CreateNoteRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateNoteState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateNoteAction): CreateNoteState => {
  switch (type) {
    case Actions.CREATE_NOTE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_NOTE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_NOTE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
