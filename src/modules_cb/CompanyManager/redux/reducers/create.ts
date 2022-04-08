import {CreateCompanyRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateCompanyAction} from "../actions";

export interface CreateCompanyState {
  loading: boolean,
  request?: CreateCompanyRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateCompanyState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateCompanyAction): CreateCompanyState => {
  switch (type) {
    case Actions.CREATE_COMPANY:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_COMPANY_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
