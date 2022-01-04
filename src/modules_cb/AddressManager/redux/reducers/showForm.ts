import * as Actions from "../actions";
import {AddressFormAction} from "../actions";
import {AddressEntity} from "../../types";

export interface AddressFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: AddressEntity|any
}

const initState: AddressFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: AddressFormAction): AddressFormState => {
  switch (type) {
    case Actions.ADDRESS_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.ADDRESS_SHOW_FORM_UPDATE:
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
