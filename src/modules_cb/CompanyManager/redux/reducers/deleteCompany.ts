import {DeleteCompanyRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteCompanyAction} from "../actions";

export interface DeleteCompanyState {
  loading: boolean,
  request?: DeleteCompanyRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteCompanyState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteCompanyAction): DeleteCompanyState => {
  switch (type) {
    case Actions.DELETE_COMPANY:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_COMPANY_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
