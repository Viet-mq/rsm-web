import {UpdateDepartmentRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateDepartmentAction} from "../actions";

export interface UpdateDepartmentState {
  loading: boolean,
  request?: UpdateDepartmentRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateDepartmentState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateDepartmentAction): UpdateDepartmentState => {
  switch (type) {
    case Actions.UPDATE_DEPARTMENT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_DEPARTMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
