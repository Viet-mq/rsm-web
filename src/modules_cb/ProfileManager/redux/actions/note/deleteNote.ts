import {DeleteNoteRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteNoteAction {
  type: string,
  request?: DeleteNoteRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_NOTE = "DELETE_NOTE";
export const DELETE_NOTE_SUCCESS = "DELETE_NOTE_SUCCESS";
export const DELETE_NOTE_ERROR = "DELETE_NOTE_ERROR";

export const deleteNote = (request: DeleteNoteRequest): DeleteNoteAction => ({
  type: DELETE_NOTE,
  request
});

export const deleteNoteSuccess = (response: ResponseBase2): DeleteNoteAction => ({
  type: DELETE_NOTE_SUCCESS,
  response
});

export const deleteNoteError = (error: AppError): DeleteNoteAction => ({
  type: DELETE_NOTE_ERROR,
  error
});
