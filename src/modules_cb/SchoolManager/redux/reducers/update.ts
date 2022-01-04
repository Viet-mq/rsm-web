import {UpdateSchoolRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateSchoolAction} from "../actions";

export interface UpdateSchoolState {
  loading: boolean,
  request?: UpdateSchoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateSchoolState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateSchoolAction): UpdateSchoolState => {
  switch (type) {
    case Actions.UPDATE_SCHOOL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_SCHOOL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_SCHOOL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
