import {DeleteSchoolRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteSchoolAction} from "../actions";

export interface DeleteSchoolState {
  loading: boolean,
  request?: DeleteSchoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteSchoolState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteSchoolAction): DeleteSchoolState => {
  switch (type) {
    case Actions.DELETE_SCHOOL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_SCHOOL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_SCHOOL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
