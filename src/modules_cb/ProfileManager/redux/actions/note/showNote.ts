import { NoteEntity} from "../../../types";

export interface ShowNoteAction {
  type: string,
  show_note_update?: boolean,
  show_note_create?: boolean,
  data_update?:NoteEntity,
  idProfile?:string
}

export const SHOW_FORM_NOTE_CREATE = "SHOW_FORM_NOTE_CREATE";
export const SHOW_FORM_NOTE_UPDATE = "SHOW_FORM_NOTE_UPDATE";

export const showFormCreateNote = (show: boolean,idProfile?:string): ShowNoteAction => ({
  type: SHOW_FORM_NOTE_CREATE,
  show_note_create: show,
  idProfile
});

export const showFormUpdateNote = (show: boolean, dataUpdate?: NoteEntity): ShowNoteAction => ({
  type: SHOW_FORM_NOTE_UPDATE,
  show_note_update: show,
  data_update: dataUpdate
});
