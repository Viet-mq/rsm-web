import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {DeleteGroupAPIAction} from "../../actions";

export interface DeleteGroupAPIState {
  loading: boolean,
  id?: string,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteGroupAPIState = {
  loading: false
}

export default (state = initState, {type, id, response, error}: DeleteGroupAPIAction): DeleteGroupAPIState => {
  switch (type) {
    case Actions.DELETE_GROUP_API:
      return {
        ...state,
        id,
        loading: true
      }
    case Actions.DELETE_GROUP_API_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_GROUP_API_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
