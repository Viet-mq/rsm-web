import * as Actions from "../actions";
import {StatusCVFormAction} from "../actions";
import {StatusCVEntity} from "../../types";

export interface StatusCVFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: StatusCVEntity|any
}

const initState: StatusCVFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: StatusCVFormAction): StatusCVFormState => {
  switch (type) {
    case Actions.STATUSCV_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.STATUSCV_SHOW_FORM_UPDATE:
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
