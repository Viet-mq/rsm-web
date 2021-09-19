import {CreateDepartmentRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateDepartmentAction} from "../actions";

export interface CreateDepartmentState {
  loading: boolean,
  request?: CreateDepartmentRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateDepartmentState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateDepartmentAction): CreateDepartmentState => {
  switch (type) {
    case Actions.CREATE_DEPARTMENT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_DEPARTMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
