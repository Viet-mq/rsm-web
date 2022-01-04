import {DeleteRecruitmentRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteRecruitmentAction} from "../actions";

export interface DeleteRecruitmentState {
  loading: boolean,
  request?: DeleteRecruitmentRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteRecruitmentState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteRecruitmentAction): DeleteRecruitmentState => {
  switch (type) {
    case Actions.DELETE_RECRUITMENT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_RECRUITMENT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_RECRUITMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
