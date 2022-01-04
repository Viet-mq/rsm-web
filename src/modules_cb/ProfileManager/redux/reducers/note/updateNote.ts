import {UpdateNoteRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {UpdateNoteAction} from "../../actions";

export interface UpdateNoteState {
  loading: boolean,
  request?: UpdateNoteRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateNoteState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateNoteAction): UpdateNoteState => {
  switch (type) {
    case Actions.UPDATE_NOTE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_NOTE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
