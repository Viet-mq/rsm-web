import {DeleteDepartmentRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteDepartmentAction} from "../actions";

export interface DeleteDepartmentState {
  loading: boolean,
  request?: DeleteDepartmentRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteDepartmentState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteDepartmentAction): DeleteDepartmentState => {
  switch (type) {
    case Actions.DELETE_DEPARTMENT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_DEPARTMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
