import {CreateRecruitmentRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateRecruitmentAction} from "../actions";

export interface CreateRecruitmentState {
  loading: boolean,
  request?: CreateRecruitmentRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateRecruitmentState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateRecruitmentAction): CreateRecruitmentState => {
  switch (type) {
    case Actions.CREATE_RECRUITMENT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_RECRUITMENT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_RECRUITMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
