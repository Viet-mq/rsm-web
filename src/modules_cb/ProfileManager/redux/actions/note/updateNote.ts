import {UpdateNoteRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateNoteAction {
  type: string,
  request?: UpdateNoteRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_NOTE = "UPDATE_NOTE";
export const UPDATE_NOTE_SUCCESS = "UPDATE_NOTE_SUCCESS";
export const UPDATE_NOTE_ERROR = "UPDATE_NOTE_ERROR";

export const updateNote = (request: UpdateNoteRequest): UpdateNoteAction => ({
  type: UPDATE_NOTE,
  request
});

export const updateNoteSuccess = (response: ResponseBase2): UpdateNoteAction => ({
  type: UPDATE_NOTE_SUCCESS,
  response
});

export const updateNoteError = (error: AppError): UpdateNoteAction => ({
  type: UPDATE_NOTE_ERROR,
  error
});
