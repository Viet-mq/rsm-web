import {DeleteNoteRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {DeleteNoteAction} from "../../actions";

export interface DeleteNoteState {
  loading: boolean,
  request?: DeleteNoteRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteNoteState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteNoteAction): DeleteNoteState => {
  switch (type) {
    case Actions.DELETE_NOTE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_NOTE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
