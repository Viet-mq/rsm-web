import * as Actions from "../actions";
import {DepartmentFormAction} from "../actions";
import {DepartmentEntity} from "../../types";

export interface DepartmentFormState {
  show_create?: boolean,
  show_update?: boolean,
  data_update?: DepartmentEntity|any
}

const initState: DepartmentFormState = {
  show_create: false,
  show_update: false,
}

export default (state = initState, {
  type,
  show_create,
  show_update,
  data_update
}: DepartmentFormAction): DepartmentFormState => {
  switch (type) {
    case Actions.DEPARTMENT_SHOW_FORM_CREATE:
      return {
        ...state,
        show_create,
        show_update: false,
      }
    case Actions.DEPARTMENT_SHOW_FORM_UPDATE:
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
