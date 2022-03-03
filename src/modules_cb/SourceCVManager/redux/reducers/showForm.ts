import * as Actions from "../actions";
import {SourceCVFormAction} from "../actions";
import {SourceCVEntity} from "../../types";

export interface SourceCVFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: SourceCVEntity|any
}

const initState: SourceCVFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: SourceCVFormAction): SourceCVFormState => {
  switch (type) {
    case Actions.SOURCE_CV_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.SOURCE_CV_SHOW_FORM_UPDATE:
      return {
        ...state,
        show_update,
        data_update,
        show_create: false,
      }

    default:
      return state;
  }
}
