import * as Actions from "../actions";
import {ShowCompanyFormAction} from "../actions";
import {CompanyEntity} from "../../types";

export interface ShowCompanyFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: CompanyEntity|any
}

const initState: ShowCompanyFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: ShowCompanyFormAction): ShowCompanyFormState => {
  switch (type) {
    case Actions.SHOW_FORM_COMPANY_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.SHOW_FORM_COMPANY_UPDATE:
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
