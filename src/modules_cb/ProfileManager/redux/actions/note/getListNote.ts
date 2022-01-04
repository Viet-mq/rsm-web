import {NoteEntity} from "../../../types";
import {AppError} from "../../../../../models/baseResponse";

export interface GetListNoteAction {
  type:string,
  params?:any,
  result?:NoteEntity|any
  error?:AppError
}

export const GET_LIST_NOTE = "GET_LIST_NOTE";
export const GET_LIST_NOTE_SUCCESS = "GET_LIST_NOTE_SUCCESS";
export const GET_LIST_NOTE_ERROR = "GET_LIST_NOTE_ERROR";

export const getListNote = (params:any) : GetListNoteAction =>({
  type:GET_LIST_NOTE,
  params,
})

export const getNoteSuccess = (result?:NoteEntity) =>({
  type:GET_LIST_NOTE_SUCCESS,
  result
})

export const getNoteError =( error:AppError): GetListNoteAction=>({
  type:GET_LIST_NOTE_ERROR,
  error
})
