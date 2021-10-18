import {IntentEntity} from "../../types";
import * as Actions from "../actions";
import {IntentManagerFormAction} from "../actions";

export interface IntentManagerFormState {
  showCreate?: boolean,
  showUpdate?: boolean,
  entity?: IntentEntity
}

const initState: IntentManagerFormState = {
  showCreate: false,
  showUpdate: false
}

export default (state = initState, {
  type,
  showUpdate,
  showCreate,
  entity
}: IntentManagerFormAction): IntentManagerFormState => {
  switch (type) {
    case Actions.INTENT_SHOW_FORM_CREATE:
      return {
        ...state,
        showCreate,
        showUpdate: false
      }
    case Actions.INTENT_SHOW_FORM_UPDATE:
      return {
        ...state,
        showUpdate,
        entity,
        showCreate: false
      }
    default:
      return state;
  }
}
