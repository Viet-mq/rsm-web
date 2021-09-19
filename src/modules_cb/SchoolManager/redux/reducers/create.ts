import {CreateSchoolRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateSchoolAction} from "../actions";

export interface CreateSchoolState {
  loading: boolean,
  request?: CreateSchoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateSchoolState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateSchoolAction): CreateSchoolState => {
  switch (type) {
    case Actions.CREATE_SCHOOL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_SCHOOL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_SCHOOL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
