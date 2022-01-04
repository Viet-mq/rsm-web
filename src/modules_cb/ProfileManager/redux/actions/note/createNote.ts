import {CreateNoteRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";

export interface CreateNoteAction {
  type:string,
  request?:CreateNoteRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_NOTE = "CREATE_NOTE";
export const CREATE_NOTE_SUCCESS = "CREATE_NOTE_SUCCESS";
export const CREATE_NOTE_ERROR = "CREATE_NOTE_ERROR";

export const createNote = (request: CreateNoteRequest): CreateNoteAction => ({
  type: CREATE_NOTE,
  request
});

export const createNoteSuccess = (response: ResponseBase2): CreateNoteAction => ({
  type: CREATE_NOTE_SUCCESS,
  response
});

export const createNoteError = (error: AppError): CreateNoteAction => ({
  type: CREATE_NOTE_ERROR,
  error
});
