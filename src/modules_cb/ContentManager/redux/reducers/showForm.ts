import {ChatBotContent} from "../../types";
import * as Actions from "../actions";
import {ContentFormAction} from "../actions";

export interface ContentFormState {
  show_create?: boolean,
  show_update?: boolean,
  show_import?: boolean,
  show_export?: boolean,
  content?: ChatBotContent
}

const initState: ContentFormState = {
  show_create: false,
  show_update: false,
  show_import: false,
  show_export: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  show_import,
  show_export
}: ContentFormAction): ContentFormState => {
  switch (type) {
    case Actions.CB_CONTENT_SHOW_CREATE_FORM:
      return {
        ...state,
        show_create,
        show_update: false,
        show_import: false,
        show_export: false,
      }
    case Actions.CB_CONTENT_SHOW_UPDATE_FORM:
      return {
        ...state,
        show_update,
        show_create: false,
        show_import: false,
        show_export: false,
      }
    case Actions.CB_CONTENT_SHOW_IMPORT_FORM:
      return {
        ...state,
        show_import,
        show_update: false,
        show_create: false,
        show_export: false,
      }
    case Actions.CB_CONTENT_SHOW_EXPORT_FORM:
      return {
        ...state,
        show_export,
        show_update: false,
        show_import: false,
        show_create: false,
      }
    default:
      return state;
  }
}
