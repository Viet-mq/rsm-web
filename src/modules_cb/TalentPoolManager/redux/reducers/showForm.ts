import * as Actions from "../actions";
import {TalentPoolFormAction} from "../actions";
import {TalentPoolEntity} from "../../types";

export interface TalentPoolFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: TalentPoolEntity|any
}

const initState: TalentPoolFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: TalentPoolFormAction): TalentPoolFormState => {
  switch (type) {
    case Actions.TALENT_POOL_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.TALENT_POOL_SHOW_FORM_UPDATE:
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
