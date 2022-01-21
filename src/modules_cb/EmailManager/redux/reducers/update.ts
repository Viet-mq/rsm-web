import {UpdateEmailRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateEmailAction} from "../actions";

export interface UpdateEmailState {
  loading: boolean,
  request?: UpdateEmailRequest,
  response?: ResponseBase2,
  error?: AppError,
  dataUpdate?:UpdateEmailRequest
}

const initState: UpdateEmailState = {
  loading: false
}

export default (state = initState, {type, request, response, error,dataUpdate}: UpdateEmailAction): UpdateEmailState => {
  switch (type) {
    case Actions.UPDATE_EMAIL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_EMAIL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_EMAIL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
      case Actions.SHOW_UPDATE_EMAIL_FORM:
      return {
        ...state,
        dataUpdate,
        loading: false
      }
    default:
      return state;
  }
}
