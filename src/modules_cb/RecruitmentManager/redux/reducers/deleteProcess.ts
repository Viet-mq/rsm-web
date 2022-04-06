import {DeleteProcessRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteProcessAction} from "../actions";

export interface DeleteProcessState {
  loading: boolean,
  request?: DeleteProcessRequest,
  response?: ResponseBase2,
  error?: AppError,
  index?: any
}

const initState: DeleteProcessState = {
  loading: false,
}

export default (state = initState, {
  type,
  request,
  response,
  error,
  index
}: DeleteProcessAction): DeleteProcessState => {
  switch (type) {
    case Actions.DELETE_PROCESS:
      return {
        ...state,
        request,
        index,
        loading: true
      }
    case Actions.DELETE_PROCESS_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_PROCESS_ERROR:
      return {
        ...state,
        error,
        loading: false
      }

    case Actions.RESET_DELETE_PROCESS_RESPONSE:
      return {
        ...state,
        response: undefined,
        loading: false
      }
    default:
      return state;
  }
}
