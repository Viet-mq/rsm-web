import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../../actions";
import {UpdateGroupAPIRequest} from "../../../types";
import {UpdateGroupAPIAction} from "../../actions";

export interface UpdateGroupAPIState {
  loading: boolean,
  request?: UpdateGroupAPIRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateGroupAPIState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateGroupAPIAction): UpdateGroupAPIState => {
  switch (type) {
    case Actions.UPDATE_GROUP_API:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_GROUP_API_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_GROUP_API_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
