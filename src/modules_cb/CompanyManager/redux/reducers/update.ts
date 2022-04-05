import {UpdateCompanyRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateCompanyAction} from "../actions";

export interface UpdateCompanyState {
  loading: boolean,
  request?: UpdateCompanyRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateCompanyState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateCompanyAction): UpdateCompanyState => {
  switch (type) {
    case Actions.UPDATE_COMPANY:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_COMPANY_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
