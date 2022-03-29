import {UpdateApiRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateAPIAction} from "../actions";

export interface UpdateAPIState {
  loading: boolean,
  request?: UpdateApiRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateAPIState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateAPIAction): UpdateAPIState => {
  switch (type) {
    case Actions.UPDATE_API:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_API_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_API_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
