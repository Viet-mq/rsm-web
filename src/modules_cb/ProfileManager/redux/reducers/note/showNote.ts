import * as Actions from "../../actions";
import { ShowNoteAction} from "../../actions";
import {NoteEntity} from "../../../types";

export interface ShowNoteState {
  show_note_update?: boolean,
  show_note_create?: boolean,
  data_update?:NoteEntity,
  idProfile?:string|any,
}

const initState: ShowNoteState = {
  show_note_update: false,
  show_note_create: false,
}

export default (state = initState, {
  type,
  show_note_update,
  show_note_create,
  data_update,
  idProfile
}: ShowNoteAction): ShowNoteState => {
  switch (type) {
    case Actions.SHOW_FORM_NOTE_CREATE:
      return {
        ...state,
        show_note_create,
        idProfile,
        show_note_update: false,

      }
    case Actions.SHOW_FORM_NOTE_UPDATE:
      return {
        ...state,
        show_note_update,
        data_update,
        show_note_create: false,
      }
    default:
      return state;
  }
}
