import * as Actions from "../actions";
import {ReasonRejectFormAction} from "../actions";
import {ReasonRejectEntity} from "../../types";

export interface ReasonRejectFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: ReasonRejectEntity|any
}

const initState: ReasonRejectFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: ReasonRejectFormAction): ReasonRejectFormState => {
  switch (type) {
    case Actions.REASON_REJECT_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.REASON_REJECT_SHOW_FORM_UPDATE:
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
