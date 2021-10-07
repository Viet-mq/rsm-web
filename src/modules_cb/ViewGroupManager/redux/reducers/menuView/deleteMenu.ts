import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {DeleteMenuFrontendAction} from "../../actions";

export interface DeleteMenuFrontendState {
  loading: boolean,
  id?: string,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteMenuFrontendState = {
  loading: false
}

export default (state = initState, {type, id, response, error}: DeleteMenuFrontendAction): DeleteMenuFrontendState => {
  switch (type) {
    case Actions.DELETE_MENU_FRONTEND:
      return {
        ...state,
        id,
        loading: true
      }
    case Actions.DELETE_MENU_FRONTEND_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_MENU_FRONTEND_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
