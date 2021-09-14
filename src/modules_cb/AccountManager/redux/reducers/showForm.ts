import * as Actions from "../actions";
import {AccountFormAction} from "../actions";
import {UserAccount} from "../../types";

export interface AccountFormState {
  show_create?: boolean,
  show_update?: boolean,
  show_change_password?: boolean,
  data_update?: UserAccount
}

const initState: AccountFormState = {
  show_create: false,
  show_update: false,
  show_change_password: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  show_change_password,
  data_update
}: AccountFormAction): AccountFormState => {
  switch (type) {
    case Actions.ACCOUNT_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
        show_change_password: false,
      }
    case Actions.ACCOUNT_SHOW_FORM_UPDATE:
      return {
        ...state,
        show_update,
        data_update,
        show_create: false,
        show_change_password: false,
      }
    case Actions.ACCOUNT_SHOW_FORM_CHANGE_PASSWORD:
      return {
        ...state,
        show_change_password,
        data_update,
        show_create: false,
        show_update: false,
      }
    default:
      return state;
  }
}
