import {ChangeProcessRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {ChangeProcessAction} from "../../actions/profile/changeProcess";


export interface ChangeProcessState {
  loading: boolean,
  request?: ChangeProcessRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: ChangeProcessState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: ChangeProcessAction): ChangeProcessState => {
  switch (type) {
    case Actions.CHANGE_PROCESS:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CHANGE_PROCESS_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CHANGE_PROCESS_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
