import {CreateEmailRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateEmailAction} from "../actions";

export interface CreateEmailState {
  loading: boolean,
  request?: CreateEmailRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateEmailState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateEmailAction): CreateEmailState => {
  switch (type) {
    case Actions.CREATE_EMAIL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_EMAIL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_EMAIL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
