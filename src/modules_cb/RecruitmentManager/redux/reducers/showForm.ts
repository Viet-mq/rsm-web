import * as Actions from "../actions";
import {ProcessFormAction} from "../actions";
import {StatusCVEntity} from "../../../StatusCVManager/types";


export interface ProcessFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: StatusCVEntity,
  index?:any,
}

const initState: ProcessFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update,
  index
}: ProcessFormAction): ProcessFormState => {
  switch (type) {
    case Actions.SHOW_FORM_PROCESS_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.SHOW_FORM_PROCESS_UPDATE:
      return {
        ...state,
        show_update,
        data_update,
        index,
        show_create: false,
      }

    default:
      return state;
  }
}
